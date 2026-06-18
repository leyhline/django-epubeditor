/** @import { ParData } from './epub-overlay-edit' */
/** @import { EpubOverlayEdit } from './epub-overlay-edit' */
/** @import { SlIconButton } from '@shoelace-style/shoelace' */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
import { customElement, property } from "lit/decorators.js";
import { Task } from "@lit/task";
import { adoptStyles, html, LitElement } from "lit";
import { clockValueToSeconds, playBuffer, callEndpoint, notify, showErrorDialog, enableSpinner, disableSpinner, } from "./epub-overlay-edit";
const RE_FONT_FACE_URL = /url\(([^)]+)\)/g;
const DEFAULT_ACTIVE_CLASS = "-epub-media-overlay-active";
/** @extends LitElement */
let EpubEdit = class EpubEdit extends LitElement {
    constructor() {
        super(...arguments);
        /**
           * @private
           * @default false
           */
        this.editModeActive = false;
        /**
           * @private
           * @default Task<[string | undefined, string | undefined], ParseResult>
           */
        this.handleXmlTask = new Task(this, {
            task: handleXml,
            args: () => [this.src, this.smilsrc],
        });
    }
    /**
       * Apply the media overlay functionality to the body elements.
       * @private
       * @param {Element[]} body
       * @param {Set<string>} audioSrcSet
       * @param {ParData[]} parsData
       * @returns {Promise<void>}
       */
    async applyOverlay(body, audioSrcSet, parsData) {
        this.audioContext = new AudioContext();
        const xhtmlUrl = new URL(this.src, window.location.origin);
        const smilUrl = new URL(this.smilsrc, window.location.origin);
        this.audioSrcMap = new Map(await Promise.all(Array.from(audioSrcSet).map(async (src) => {
            const audioUrl = new URL(src, smilUrl);
            const response = await fetch(audioUrl);
            const data = await response.arrayBuffer();
            const buffer = await this.audioContext.decodeAudioData(data);
            return [src, buffer];
        })));
        this.overlayElems = createOverlayTuples(body, parsData, xhtmlUrl, smilUrl).map(([parData, elem]) => {
            this.addPlayBufferEvent(parData, elem);
            return elem;
        });
    }
    /**
       * @private
       * @param {ParData} parData
       * @param {HTMLElement} elem
       * @returns {void}
       */
    addPlayBufferEvent(parData, elem) {
        elem.onclick = () => {
            if (this.editModeActive)
                return;
            const buffer = this.audioSrcMap?.get(parData.audioSrc);
            if (!buffer) {
                console.warn(`SMIL: Audio buffer for ${parData.audioSrc} not found`);
                return;
            }
            const start = clockValueToSeconds(parData.clipBegin);
            const end = clockValueToSeconds(parData.clipEnd);
            elem.classList.add(this.activeclass ?? DEFAULT_ACTIVE_CLASS);
            setTimeout(() => {
                elem.classList.remove(this.activeclass ?? DEFAULT_ACTIVE_CLASS);
            }, (end - start) * 1000);
            playBuffer(this.audioContext, buffer, start, end);
        };
    }
    /**
       * @private
       * @param {EpubOverlayEdit} epubOverlayEdit
       * @returns {void}
       */
    enableEditModeButton(epubOverlayEdit) {
        const editModeButton = document.getElementById("edit-mode-toggle");
        const undoButton = document.getElementById("undo-button");
        const redoButton = document.getElementById("redo-button");
        if (!editModeButton || !undoButton || !redoButton)
            return;
        epubOverlayEdit.audioSrcMap = this.audioSrcMap;
        epubOverlayEdit.audioContext = this.audioContext;
        editModeButton.onclick = () => {
            this.toggleEditModeEvent(epubOverlayEdit, undoButton, redoButton);
        };
        const restructuredEventHandler = (event) => {
            enableSpinner("Reloading book's media overlay");
            void handleXml([this.src, this.smilsrc], { signal: this.editModeAbortController.signal })
                .then((parseResult) => {
                if (this.editModeAbortController)
                    this.editModeAbortController.abort();
                removeEditModeListeners(parseResult.body);
                this.parseResult = parseResult;
                this.shadowRoot.replaceChildren(...parseResult.body, epubOverlayEdit);
                const xhtmlUrl = new URL(this.src, window.location.origin);
                const smilUrl = new URL(this.smilsrc, window.location.origin);
                this.overlayElems = createOverlayTuples(parseResult.body, parseResult.parsData, xhtmlUrl, smilUrl).map(([parData, elem]) => {
                    this.addPlayBufferEvent(parData, elem);
                    return elem;
                });
                this.editModeAbortController = new AbortController();
                initializeMediaOverlay(epubOverlayEdit, xhtmlUrl, smilUrl, this.editModeAbortController, parseResult.body, parseResult.parsData, this.overlayElems);
                if (event) {
                    const detail = event.detail;
                    if (detail.textId) {
                        for (let i = 0; i < this.overlayElems.length; i++) {
                            if (this.overlayElems[i].id === detail.textId) {
                                markModifyOverlayElement(this.overlayElems, i, epubOverlayEdit);
                                break;
                            }
                        }
                    }
                }
            })
                .finally(() => {
                disableSpinner();
            });
        };
        undoButton.onclick = () => {
            undoButton.disabled = true;
            redoButton.disabled = true;
            enableSpinner("Undoing last modification");
            void this.undo()
                .then(async (response) => {
                if (response.ok) {
                    await response.json();
                    restructuredEventHandler();
                }
                else if (response.headers.get("content-type")?.startsWith("text/html")) {
                    showErrorDialog(await response.text(), "Undo failed");
                }
                else {
                    const data = (await response.json());
                    notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000);
                }
            })
                .catch((error) => {
                notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000);
            })
                .finally(() => {
                undoButton.disabled = false;
                redoButton.disabled = false;
                disableSpinner();
            });
        };
        redoButton.onclick = () => {
            undoButton.disabled = true;
            redoButton.disabled = true;
            enableSpinner("Redoing last undo operation");
            void this.redo()
                .then(async (response) => {
                if (response.ok) {
                    const { message } = (await response.json());
                    notify(`Redo: ${message}`, "primary", "info-circle", 5000);
                    restructuredEventHandler();
                }
                else if (response.headers.get("content-type")?.startsWith("text/html")) {
                    showErrorDialog(await response.text(), "Redo failed");
                }
                else {
                    const data = (await response.json());
                    notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000);
                }
            })
                .catch((error) => {
                notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000);
            })
                .finally(() => {
                undoButton.disabled = false;
                redoButton.disabled = false;
                disableSpinner();
            });
        };
        // @ts-expect-error This is a custom event I defined myself in the EpubOverlayEdit component
        epubOverlayEdit.addEventListener("restructured", restructuredEventHandler);
        // After enabling all functionality, also enable the button itself.
        editModeButton.disabled = false;
    }
    /**
       * @private
       * @returns {Promise<Response>}
       */
    async undo() {
        return callEndpoint({ op: "UNDO" });
    }
    /**
       * @private
       * @returns {Promise<Response>}
       */
    async redo() {
        return callEndpoint({ op: "REDO" });
    }
    /**
       * @private
       * @param {EpubOverlayEdit} epubOverlayEdit
       * @param {SlIconButton} undoButton
       * @param {SlIconButton} redoButton
       * @returns {void}
       */
    toggleEditModeEvent(epubOverlayEdit, undoButton, redoButton) {
        if (this.editModeActive) {
            this.editModeActive = false;
            epubOverlayEdit.style.display = "none";
            if (this.editModeAbortController)
                this.editModeAbortController.abort();
            if (this.parseResult)
                removeEditModeListeners(this.parseResult.body);
            epubOverlayEdit.elems = undefined;
            undoButton.disabled = true;
            redoButton.disabled = true;
        }
        else {
            if (!this.parseResult)
                return;
            this.editModeActive = true;
            epubOverlayEdit.style.display = "flex";
            undoButton.disabled = false;
            redoButton.disabled = false;
            const xhtmlUrl = new URL(this.src, window.location.origin);
            const smilUrl = new URL(this.smilsrc, window.location.origin);
            this.editModeAbortController = new AbortController();
            initializeMediaOverlay(epubOverlayEdit, xhtmlUrl, smilUrl, this.editModeAbortController, this.parseResult.body, this.parseResult.parsData, this.overlayElems);
        }
    }
    /**
       * @private
       * @param {EpubOverlayEdit} epubOverlayEdit
       * @returns {void}
       */
    loadMediaOverlayIfExists(epubOverlayEdit) {
        const { body, audioSrcSet, parsData } = this.parseResult;
        enableSpinner("Loading book's media overlay");
        if (audioSrcSet && parsData) {
            // load the overlay if it exists, then disable the spinner
            void this.applyOverlay(body, audioSrcSet, parsData)
                .then(() => {
                this.enableEditModeButton(epubOverlayEdit);
            })
                .finally(() => {
                disableSpinner();
            });
        }
        else {
            // if the overlay does not exist, disable the spinner immediately
            disableSpinner();
        }
    }
    /**
       * @private
       * @param {EpubOverlayEdit} epubOverlayEdit
       * @returns {void}
       */
    handleInitialParseResult(epubOverlayEdit) {
        if (!this.parseResult)
            return;
        this.parseResult.styles.push(createMediaOverlayStyle(this.activeclass));
        adoptStylesAndFonts(this.renderRoot, this.parseResult.styles, this.parseResult.fontFaceRules);
        epubOverlayEdit.isVerticalWritingMode = this.parseResult.isVerticalWritingMode;
        epubOverlayEdit.style.display = this.editModeActive ? "flex" : "none";
    }
    /**
       * @protected
       * @returns {TemplateResult<1> | Element[][] | undefined}
       */
    render() {
        return this.handleXmlTask.render({
            pending: () => {
                enableSpinner("Loading book content");
                return html ` <div>Loading...</div>`;
            },
            error: (error) => {
                disableSpinner();
                return html ` <div>${error} (${this.src})</div>`;
            },
            complete: (parseResult) => {
                this.parseResult = parseResult;
                const epubOverlayEdit = document.getElementById("epub-overlay-edit");
                this.handleInitialParseResult(epubOverlayEdit);
                this.loadMediaOverlayIfExists(epubOverlayEdit);
                return [parseResult.body];
            },
        });
    }
};
__decorate([
    property({ type: String })
], EpubEdit.prototype, "src", void 0);
__decorate([
    property({ type: String })
], EpubEdit.prototype, "smilsrc", void 0);
__decorate([
    property({ type: String })
], EpubEdit.prototype, "activeclass", void 0);
EpubEdit = __decorate([
    customElement("epub-edit")
], EpubEdit);
export { EpubEdit };
/******************************************************************************
 * Helpers for loading and parsing XHTML and SMIL files
 * @param {[string | undefined, string | undefined]}
 * @param {{ signal: AbortSignal }}
 * @returns {Promise<ParseResult>}
 */
async function handleXml([xhtmlPath, smilPath], { signal }) {
    if (!xhtmlPath)
        throw new Error("src attribute missing");
    const xhtmlUrl = new URL(xhtmlPath, window.location.origin);
    const xhtmlPromise = fetch(xhtmlUrl, { signal }).then((response) => {
        if (!response.ok)
            throw new Error(response.statusText);
        return response.text();
    });
    const smilPromise = smilPath
        ? fetch(smilPath, { signal }).then((response) => {
            if (!response.ok)
                throw new Error(response.statusText);
            return response.text();
        })
        : Promise.resolve(undefined);
    const [xhtml, smil] = await Promise.all([xhtmlPromise, smilPromise]);
    return parseXml(xhtml, xhtmlUrl, smil);
}
/**
 * @param {string} xhtml
 * @param {URL} xhtmlUrl
 * @param {string | undefined} smil
 * @returns {Promise<ParseResult>}
 */
async function parseXml(xhtml, xhtmlUrl, smil) {
    const parseResult = await parseXhtml(xhtml, xhtmlUrl);
    if (smil) {
        const smilParseResult = parseSmil(smil);
        parseResult.audioSrcSet = smilParseResult.audioSrcSet;
        parseResult.parsData = smilParseResult.parsData;
    }
    return parseResult;
}
/**
 * @param {string} xhtml
 * @param {URL} xhtmlUrl
 * @returns {Promise<XhtmlParseResult>}
 */
async function parseXhtml(xhtml, xhtmlUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xhtml, "application/xhtml+xml");
    const cssPromises = Array.from(doc.head.children)
        .filter((elem) => elem.tagName.toLowerCase() === "link" &&
        (elem.getAttribute("rel") ?? "").toLowerCase() === "stylesheet" &&
        elem.getAttribute("href"))
        .map(async (linkElem) => {
        const cssHref = linkElem.getAttribute("href");
        const cssUrl = new URL(cssHref, xhtmlUrl);
        const cssResponse = await fetch(cssUrl);
        if (!cssResponse.ok)
            throw new Error(cssResponse.statusText);
        const css = await cssResponse.text();
        return [css, cssUrl];
    });
    const cssTexts = await Promise.all(cssPromises);
    const styles = [];
    const fontFaceRules = [];
    let isVerticalWritingMode = false;
    cssTexts.forEach(([css, cssUrl]) => {
        const cssParseResult = parseCss(css, cssUrl);
        styles.push(cssParseResult.styleSheet);
        fontFaceRules.push(...cssParseResult.fontFaceRules);
        isVerticalWritingMode ||= cssParseResult.isVerticalWritingMode;
    });
    const body = Array.from(doc.body.children);
    postprocessBody(body, xhtmlUrl);
    return { body, styles, fontFaceRules, isVerticalWritingMode };
}
/**
 * @param {string} css
 * @param {URL} cssUrl
 * @returns {CssParseResult}
 */
function parseCss(css, cssUrl) {
    const fontFaceRules = [];
    const styleSheet = new CSSStyleSheet();
    let isVerticalWritingMode = false;
    styleSheet.replaceSync(css);
    for (const rule of styleSheet.cssRules) {
        if (rule.constructor.name === "CSSFontFaceRule") {
            let fontFaceRule = rule;
            try {
                const fontFaceSrc = fontFaceRule.style.getPropertyValue("src");
                if (!fontFaceSrc)
                    continue;
                const newFontFaceSrc = fontFaceSrc.replaceAll(RE_FONT_FACE_URL, (_, rawUrl) => {
                    const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
                    const resolvedUrl = new URL(cleanUrl, cssUrl);
                    return `url("${resolvedUrl.pathname}")`;
                });
                fontFaceRule.style.setProperty("src", newFontFaceSrc);
            }
            catch (error) {
                console.warn("Firefox does not support CSSStyleDeclaration.setProperty, hence using a workaround. Browser exception:", error);
                const newFontFaceRuleText = fontFaceRule.cssText.replaceAll(RE_FONT_FACE_URL, (_, rawUrl) => {
                    const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
                    const resolvedUrl = new URL(cleanUrl, cssUrl);
                    return `url("${resolvedUrl.pathname}")`;
                });
                const tempStyleSheet = new CSSStyleSheet();
                const newRuleIndex = tempStyleSheet.insertRule(newFontFaceRuleText);
                fontFaceRule = tempStyleSheet.cssRules[newRuleIndex];
            }
            fontFaceRules.push(fontFaceRule);
        }
        else if (rule.constructor.name === "CSSStyleRule") {
            const styleRule = rule;
            if (["html", "body", ":root"].includes(styleRule.selectorText)) {
                styleRule.selectorText = ":host";
                const writingModeRules = new Set();
                for (const styleProp of styleRule.style) {
                    if (["writing-mode", "-webkit-writing-mode", "-epub-writing-mode"].includes(styleProp)) {
                        writingModeRules.add(styleRule.style.getPropertyValue(styleProp));
                    }
                }
                if (writingModeRules.has("vertical-rl") || writingModeRules.has("vertical-lr"))
                    isVerticalWritingMode = true;
            }
        }
    }
    return { styleSheet, fontFaceRules, isVerticalWritingMode };
}
/**
 * Some postprocessing operations, currently for replacing hyperlinks inside the
 * XHTML document. Modifies the body argument.
 * @param {Element[]} body
 * @param {URL} xhtmlUrl
 * @returns {void}
 */
function postprocessBody(body, xhtmlUrl) {
    const imgElems = body
        .flatMap((elem) => Array.from(elem.getElementsByTagName("img")))
        .filter((elem) => elem.hasAttribute("src"));
    for (const imgElem of imgElems) {
        const imgSrc = imgElem.getAttribute("src");
        imgElem.setAttribute("src", new URL(imgSrc, xhtmlUrl).pathname);
    }
}
/**
 * @param {string} smil
 * @returns {SmilParseResult}
 */
function parseSmil(smil) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(smil, "application/xml");
    const parList = doc.querySelectorAll("par");
    const audioSrcSet = new Set();
    const parsData = [];
    for (const parElem of parList) {
        const textElems = parElem.getElementsByTagName("text");
        console.assert(textElems.length > 0, "text element not found: %o", parElem);
        const textElem = textElems.item(0);
        if (!textElem)
            continue;
        console.assert(textElems.length === 1, "multiple text elements found: %o", parElem);
        const audioElems = parElem.getElementsByTagName("audio");
        console.assert(audioElems.length > 0, "audio element not found: %o", parElem);
        const audioElem = audioElems.item(0);
        if (!audioElem)
            continue;
        console.assert(audioElems.length === 1, "multiple audio elements found: %o", parElem);
        const parId = parElem.getAttribute("id");
        const textSrc = textElem.getAttribute("src");
        const audioSrc = audioElem.getAttribute("src");
        const clipBegin = audioElem.getAttribute("clipBegin");
        const clipEnd = audioElem.getAttribute("clipEnd");
        if (parId && textSrc && audioSrc && clipBegin && clipEnd) {
            audioSrcSet.add(audioSrc);
            parsData.push({ parId, textSrc, audioSrc, clipBegin, clipEnd });
        }
        else {
            console.warn("Incomplete par element: %o", parElem);
        }
    }
    return { audioSrcSet, parsData };
}
/******************************************************************************
 * Helpers for the edit mode functionality
 * @param {Element[]} body
 * @param {ParData[]} parsData
 * @param {URL} xhtmlUrl
 * @param {URL} smilUrl
 * @returns {[ParData, HTMLElement][]}
 */
function createOverlayTuples(body, parsData, xhtmlUrl, smilUrl) {
    const idElemMap = new Map(body.flatMap((elem) => Array.from(elem.getElementsByTagName("*"))
        .filter((elem) => elem.hasAttribute("id"))
        .map((elem) => [elem.getAttribute("id"), elem])));
    const overlayTuples = [];
    for (const parData of parsData) {
        const [href, fragment] = parData.textSrc.split("#", 2);
        const parUrl = new URL(href, smilUrl);
        if (xhtmlUrl.pathname !== parUrl.pathname) {
            console.warn(`SMIL: ${href} does not match xhtml ${xhtmlUrl.pathname}`);
            continue;
        }
        const elem = idElemMap.get(fragment);
        if (!elem) {
            console.warn(`SMIL: Element with id ${fragment} not found`);
            continue;
        }
        overlayTuples.push([parData, elem]);
    }
    return overlayTuples;
}
/**
 * @param {ParData[]} parsData
 * @param {URL} xhtmlUrl
 * @param {URL} smilUrl
 * @returns {Map<string, ParData>}
 */
function createIdParMap(parsData, xhtmlUrl, smilUrl) {
    return new Map(parsData
        .map((parData) => {
        const [href, fragment] = parData.textSrc.split("#", 2);
        return [href, fragment, parData];
    })
        .filter(([href]) => {
        const parUrl = new URL(href, smilUrl);
        return xhtmlUrl.pathname === parUrl.pathname;
    })
        .map(([, fragment, parData]) => [fragment, parData]));
}
/**
 * @param {Element[]} overlayElems
 * @param {EpubOverlayEdit} epubOverlayEdit
 * @param {AbortSignal} abortSignal
 * @returns {void}
 */
function addModifyOverlayListeners(overlayElems, epubOverlayEdit, abortSignal) {
    overlayElems.forEach((elem, i) => {
        elem.classList.add("-epub-media-overlay-marked");
        elem.addEventListener("click", () => {
            markModifyOverlayElement(overlayElems, i, epubOverlayEdit);
        }, { signal: abortSignal });
    });
}
/**
 * @param {Element[]} overlayElems
 * @param {number} selectedIndex
 * @param {EpubOverlayEdit} epubOverlayEdit
 * @returns {void}
 */
function markModifyOverlayElement(overlayElems, selectedIndex, epubOverlayEdit) {
    overlayElems.forEach((elemForClassRemove) => {
        elemForClassRemove.classList.remove("-epub-media-overlay-active");
    });
    overlayElems[selectedIndex].classList.add("-epub-media-overlay-active");
    epubOverlayEdit.elems = {
        prev: overlayElems[selectedIndex - 1],
        selected: overlayElems[selectedIndex],
        next: overlayElems[selectedIndex + 1],
    };
}
/**
 * @param {Element[]} elems
 * @param {ParData[]} parsData
 * @param {URL} xhtmlUrl
 * @param {EpubOverlayEdit} epubOverlayEdit
 * @param {AbortSignal} abortSignal
 * @returns {void}
 */
function addCreateOverlayListeners(elems, parsData, xhtmlUrl, epubOverlayEdit, abortSignal) {
    const textSrcSet = new Set(parsData.map((parData) => parData.textSrc.split("#", 2)[1]));
    elems.forEach((elem) => {
        elem.addEventListener("click", (event) => {
            event.stopPropagation();
            let target = event.target;
            while (!target.hasAttribute("id")) {
                target = target.parentElement;
                if (target === null)
                    return;
            }
            const textSrcAnchor = target.getAttribute("id");
            if (textSrcSet.has(textSrcAnchor))
                return;
            target.classList.add("-epub-media-overlay-create");
            const searchPrevResult = partlyDfs(target, textSrcSet, false);
            const searchNextResult = partlyDfs(target, textSrcSet, true);
            const audioSrcCounter = {};
            parsData.forEach((parData) => {
                audioSrcCounter[parData.audioSrc] = (audioSrcCounter[parData.audioSrc] ?? 0) + 1;
            });
            const maxAudioSrc = Object.entries(audioSrcCounter)
                .sort(([, a], [, b]) => b - a)
                .at(0);
            const xhtmlName = xhtmlUrl.pathname.split("/").pop();
            epubOverlayEdit.elems = {
                prev: searchPrevResult,
                selected: target,
                next: searchNextResult,
                textSrcNew: `${xhtmlName}#${textSrcAnchor}`,
                audioSrcNew: maxAudioSrc?.[0],
            };
        }, { signal: abortSignal });
    });
}
/**
 * Recursively search the next element with an existing overlay id
 * or return null if there is nothing.
 * @param {Element} elem
 * @param {Set<string>} textSrcSet
 * @param {boolean} forwardSearch
 * @returns {Element | null}
 */
function partlyDfs(elem, textSrcSet, forwardSearch) {
    const result = dfs(elem, textSrcSet, forwardSearch);
    if (result)
        return result;
    let sibling = forwardSearch ? elem.nextElementSibling : elem.previousElementSibling;
    while (sibling) {
        const siblingResult = dfs(sibling, textSrcSet, forwardSearch);
        if (siblingResult)
            return siblingResult;
        sibling = forwardSearch ? sibling.nextElementSibling : sibling.previousElementSibling;
    }
    const parentSibling = forwardSearch
        ? elem.parentElement?.nextElementSibling
        : elem.parentElement?.previousElementSibling;
    if (parentSibling)
        return partlyDfs(parentSibling, textSrcSet, forwardSearch);
    return null;
}
/**
 * @param {Element} elem
 * @param {Set<string>} textSrcSet
 * @param {boolean} forwardSearch
 * @returns {Element | null}
 */
function dfs(elem, textSrcSet, forwardSearch) {
    const textSrc = elem.getAttribute("id");
    if (textSrc && textSrcSet.has(textSrc))
        return elem;
    const children = Array.from(elem.children);
    if (!forwardSearch)
        children.reverse();
    for (const child of children) {
        const childTextSrc = dfs(child, textSrcSet, forwardSearch);
        if (childTextSrc)
            return childTextSrc;
    }
    return null;
}
/**
 * Remove all relevant media overlay classes from given `element`:
 *
 * - `-epub-media-overlay-active` the element that is currently selected
 * - `-epub-media-overlay-marked` every element that has media overlay data is marked
 * - `-epub-media-overlay-create` an element that has no media overlay data but is selected
 * @param {Element} element
 * @returns {void}
 */
function removeMediaOverlayClasses(element) {
    element.classList.remove("-epub-media-overlay-active");
    element.classList.remove("-epub-media-overlay-marked");
    element.classList.remove("-epub-media-overlay-create");
}
/**
 * Adds elements to `elemListeners` and `newOverlayListeners`.
 * @param {EpubOverlayEdit} epubOverlayEdit
 * @param {URL} xhtmlUrl
 * @param {URL} smilUrl
 * @param {AbortController} editModeAbortController
 * @param {Element[]} body
 * @param {ParData[]} parsData
 * @param {Element[]} overlayElems
 * @returns {void}
 */
function initializeMediaOverlay(epubOverlayEdit, xhtmlUrl, smilUrl, editModeAbortController, body, parsData, overlayElems) {
    epubOverlayEdit.idParMap = createIdParMap(parsData, xhtmlUrl, smilUrl);
    addEditModeListeners(epubOverlayEdit, xhtmlUrl, editModeAbortController, body, parsData, overlayElems);
}
/**
 * @param {EpubOverlayEdit} epubOverlayEdit
 * @param {URL} xhtmlUrl
 * @param {AbortController} editModeAbortController
 * @param {Element[]} body
 * @param {ParData[]} parsData
 * @param {Element[]} overlayElems
 * @returns {void}
 */
function addEditModeListeners(epubOverlayEdit, xhtmlUrl, editModeAbortController, body, parsData, overlayElems) {
    addModifyOverlayListeners(overlayElems, epubOverlayEdit, editModeAbortController.signal);
    // TODO: there is a bug with create and delete: write tests, fix bug, enable again, unhide delete button
    // addCreateOverlayListeners(body, parsData, xhtmlUrl, epubOverlayEdit, editModeAbortController.signal)
}
/**
 * @param {Element[]} body
 * @returns {void}
 */
function removeEditModeListeners(body) {
    for (const elem of body) {
        removeMediaOverlayClasses(elem);
        for (const descendant of elem.getElementsByTagName("*")) {
            removeMediaOverlayClasses(descendant);
        }
    }
}
/**
 * If no `activeclass` class name is provided by the epub itself, then we use a generic rule
 * for marking elements that are active (i.e. these with current audio playback).
 * @param {string | undefined} activeclass
 * @returns {CSSStyleSheet}
 */
function createMediaOverlayStyle(activeclass) {
    const style = new CSSStyleSheet();
    style.insertRule(".-epub-media-overlay-marked { border: 1px solid; cursor: pointer }");
    style.insertRule(".-epub-media-overlay-marked + .-epub-media-overlay-marked { margin-inline-start: 2em }");
    style.insertRule(".-epub-media-overlay-marked:hover { background-color: var(--sl-color-primary-100) }");
    style.insertRule(".-epub-media-overlay-create { border: 1px dashed}");
    if (!activeclass) {
        style.insertRule(".-epub-media-overlay-active { background-color: var(--sl-color-primary-100) }");
    }
    return style;
}
/**
 * @param {ShadowRoot} renderRoot
 * @param {CSSStyleSheet[]} styles
 * @param {CSSFontFaceRule[]} fontFaceRules
 * @returns {void}
 */
function adoptStylesAndFonts(renderRoot, styles, fontFaceRules) {
    if (fontFaceRules.length > 0) {
        const sheet = new CSSStyleSheet();
        fontFaceRules.forEach((rule) => {
            sheet.insertRule(rule.cssText);
        });
        document.adoptedStyleSheets = [sheet];
    }
    adoptStyles(renderRoot, styles);
}
// @license-end
/** @typedef {XhtmlParseResult & Partial<SmilParseResult>} ParseResult */
/**
 * @typedef {Object} XhtmlParseResult
 * @property {Element[]} body
 * @property {CSSStyleSheet[]} styles
 * @property {CSSFontFaceRule[]} fontFaceRules
 * @property {boolean} isVerticalWritingMode
 */
/**
 * @typedef {Object} CssParseResult
 * @property {CSSStyleSheet} styleSheet
 * @property {CSSFontFaceRule[]} fontFaceRules
 * @property {boolean} isVerticalWritingMode
 */
/**
 * @typedef {Object} SmilParseResult
 * @property {Set<string>} audioSrcSet
 * @property {ParData[]} parsData
 */
