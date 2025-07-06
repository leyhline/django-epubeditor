// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0

import { customElement, property } from "lit/decorators.js"
import { Task } from "@lit/task"
import { adoptStyles, html, LitElement } from "lit"
import type { ParData } from "./epub-overlay-edit"
import { clockValueToSeconds, EpubOverlayEdit, playBuffer } from "./epub-overlay-edit"
import type { SlIconButton, SlTooltip } from "@shoelace-style/shoelace"

type ParseResult = XhtmlParseResult & Partial<SmilParseResult>

interface XhtmlParseResult {
  body: Element[]
  styles: CSSStyleSheet[]
  fontFaceRules: CSSFontFaceRule[]
  isVerticalWritingMode: boolean
}

interface CssParseResult {
  styleSheet: CSSStyleSheet
  fontFaceRules: CSSFontFaceRule[]
  isVerticalWritingMode: boolean
}

interface SmilParseResult {
  audioSrcSet: Set<string>
  parsData: ParData[]
}

const RE_FONT_FACE_URL = /url\("?([^")]+)"?\).*/
const DEFAULT_ACTIVE_CLASS = "-epub-media-overlay-active"

@customElement("epub-edit")
export class EpubEdit extends LitElement {
  /** absolute URL of XHTML file */
  @property({ type: String }) src?: string
  /** absolute URL of SMIL file */
  @property({ type: String }) smilsrc?: string
  /** optional 'media:active-class' attribute from the package.opf */
  @property({ type: String }) activeclass?: string

  private audioContext?: AudioContext
  private audioSrcMap?: Map<string, AudioBuffer>
  private parseResult?: ParseResult
  private overlayElems?: Element[]
  private editModeActive = false
  private editModeAbortController?: AbortController

  private handleXmlTask = new Task(this, {
    task: handleXml,
    args: (): [string | undefined, string | undefined] => [this.src, this.smilsrc],
  })

  /** Apply the media overlay functionality to the body elements. */
  private async applyOverlay(body: Element[], audioSrcSet: Set<string>, parsData: ParData[]): Promise<void> {
    this.audioContext = new AudioContext()
    const xhtmlUrl = new URL(this.src!, window.location.origin)
    const smilUrl = new URL(this.smilsrc!, window.location.origin)
    this.audioSrcMap = new Map<string, AudioBuffer>(
      await Promise.all(
        Array.from(audioSrcSet).map(async (src) => {
          const audioUrl = new URL(src, smilUrl)
          const response = await fetch(audioUrl)
          const data = await response.arrayBuffer()
          const buffer = await this.audioContext!.decodeAudioData(data)
          return [src, buffer] as [string, AudioBuffer]
        }),
      ),
    )
    this.overlayElems = createOverlayTuples(body, parsData, xhtmlUrl, smilUrl).map(([parData, elem]) => {
      this.addPlayBufferEvent(parData, elem)
      return elem
    })
  }

  private addPlayBufferEvent(parData: ParData, elem: HTMLElement): void {
    elem.onclick = () => {
      if (this.editModeActive) return
      const buffer = this.audioSrcMap?.get(parData.audioSrc)
      if (!buffer) {
        console.warn(`SMIL: Audio buffer for ${parData.audioSrc} not found`)
        return
      }
      const start = clockValueToSeconds(parData.clipBegin)
      const end = clockValueToSeconds(parData.clipEnd)
      elem.classList.add(this.activeclass ?? DEFAULT_ACTIVE_CLASS)
      setTimeout(
        () => {
          elem.classList.remove(this.activeclass ?? DEFAULT_ACTIVE_CLASS)
        },
        (end - start) * 1000,
      )
      playBuffer(this.audioContext!, buffer, start, end)
    }
  }

  private enableSpinner(tooltip: string): void {
    const spinner = document.getElementById("header-spinner") as SlTooltip | null
    if (spinner) {
      spinner.classList.remove("invisible")
      spinner.content = tooltip
    }
  }

  private disableSpinner(): void {
    const spinner = document.getElementById("header-spinner") as SlTooltip | null
    if (spinner) {
      spinner.classList.add("invisible")
      spinner.content = ""
    }
  }

  private enableEditModeButton(epubOverlayEdit: EpubOverlayEdit): void {
    const editModeButton = document.getElementById("edit-mode-toggle") as SlIconButton | null
    if (!editModeButton) return
    epubOverlayEdit.audioSrcMap = this.audioSrcMap
    epubOverlayEdit.audioContext = this.audioContext
    editModeButton.onclick = () => {
      this.toggleEditModeEvent(epubOverlayEdit)
    }
    // @ts-expect-error This is a custom event I defined myself in the EpubOverlayEdit component
    epubOverlayEdit.addEventListener("restructured", (event: CustomEvent) => {
      const detail = event.detail as { textId: string | null }
      this.enableSpinner("Reloading book's media overlay")
      void handleXml([this.src, this.smilsrc], { signal: this.editModeAbortController!.signal })
        .then((parseResult) => {
          if (this.editModeAbortController) this.editModeAbortController.abort()
          removeEditModeListeners(parseResult.body)
          this.parseResult = parseResult
          this.shadowRoot!.replaceChildren(...parseResult.body, epubOverlayEdit)
          const xhtmlUrl = new URL(this.src!, window.location.origin)
          const smilUrl = new URL(this.smilsrc!, window.location.origin)
          this.overlayElems = createOverlayTuples(parseResult.body, parseResult.parsData!, xhtmlUrl, smilUrl).map(
            ([parData, elem]) => {
              this.addPlayBufferEvent(parData, elem)
              return elem
            },
          )
          this.editModeAbortController = new AbortController()
          initializeMediaOverlay(
            epubOverlayEdit,
            xhtmlUrl,
            smilUrl,
            this.editModeAbortController,
            parseResult.body,
            parseResult.parsData!,
            this.overlayElems,
          )
          if (detail.textId) {
            for (let i = 0; i < this.overlayElems.length; i++) {
              if (this.overlayElems[i].id === detail.textId) {
                markModifyOverlayElement(this.overlayElems, i, epubOverlayEdit)
                break
              }
            }
          }
        })
        .finally(() => {
          this.disableSpinner()
        })
    })
    /*
    // @ts-expect-error This is a custom event I defined myself in the EpubOverlayEdit component
    epubOverlayEdit.addEventListener("deleted", (event: CustomEvent) => {
      const { elems, old } = event.detail as { old: ParData; elems: ParElems }
      this.afterDeletedEvent(elems, old.parId, epubOverlayEdit)
    })
    // @ts-expect-error This is a custom event I defined myself in the EpubOverlayEdit component
    epubOverlayEdit.addEventListener("created", (event: CustomEvent) => {
      const detail = event.detail as { new: ParData; elems: ParElems }
      this.afterCreatedEvent(detail.elems, detail.new, epubOverlayEdit)
    })
    // @ts-expect-error This is a custom event I defined myself in the EpubOverlayEdit component
    epubOverlayEdit.addEventListener("merged", (event: CustomEvent) => {
      const detail = event.detail as { new: ParData; parIdDeleted: string; textIdDeleted: string }
      this.afterMergeEvent(detail.new, detail.textIdDeleted, detail.parIdDeleted, epubOverlayEdit)
    })
    // @ts-expect-error This is a custom event I defined myself in the EpubOverlayEdit component
    epubOverlayEdit.addEventListener("split", (event: CustomEvent) => {
      console.warn("Not implemented: handling of split event", event.detail)
      this.afterSplitEvent(epubOverlayEdit)
    })
    */
    // After enabling all functionality, also enable the button itself.
    editModeButton.disabled = false
  }

  private toggleEditModeEvent(epubOverlayEdit: EpubOverlayEdit): void {
    if (this.editModeActive) {
      this.editModeActive = false
      epubOverlayEdit.style.display = "none"
      if (this.editModeAbortController) this.editModeAbortController.abort()
      if (this.parseResult) removeEditModeListeners(this.parseResult.body)
      epubOverlayEdit.elems = undefined
    } else {
      if (!this.parseResult) return
      this.editModeActive = true
      epubOverlayEdit.style.display = "flex"
      const xhtmlUrl = new URL(this.src!, window.location.origin)
      const smilUrl = new URL(this.smilsrc!, window.location.origin)
      this.editModeAbortController = new AbortController()
      initializeMediaOverlay(
        epubOverlayEdit,
        xhtmlUrl,
        smilUrl,
        this.editModeAbortController,
        this.parseResult.body,
        this.parseResult.parsData!,
        this.overlayElems!,
      )
    }
  }

  private loadMediaOverlayIfExists(epubOverlayEdit: EpubOverlayEdit): void {
    const { body, audioSrcSet, parsData } = this.parseResult!
    this.enableSpinner("Loading book's media overlay")
    if (audioSrcSet && parsData) {
      // load the overlay if it exists, then disable the spinner
      void this.applyOverlay(body, audioSrcSet, parsData)
        .then(() => {
          this.enableEditModeButton(epubOverlayEdit)
        })
        .finally(() => {
          this.disableSpinner()
        })
    } else {
      // if the overlay does not exist, disable the spinner immediately
      this.disableSpinner()
    }
  }

  private handleInitialParseResult(epubOverlayEdit: EpubOverlayEdit): void {
    if (!this.parseResult) return
    this.parseResult.styles.push(createMediaOverlayStyle(this.activeclass))
    adoptStylesAndFonts(this.renderRoot as ShadowRoot, this.parseResult.styles, this.parseResult.fontFaceRules)
    epubOverlayEdit.isVerticalWritingMode = this.parseResult.isVerticalWritingMode
    epubOverlayEdit.style.display = this.editModeActive ? "flex" : "none"
  }

  protected render() {
    return this.handleXmlTask.render({
      pending: () => {
        this.enableSpinner("Loading book content")
        return html` <div>Loading...</div>`
      },
      error: (error) => {
        this.disableSpinner()
        return html` <div>${error} (${this.src})</div>`
      },
      complete: (parseResult) => {
        this.parseResult = parseResult
        const epubOverlayEdit = new EpubOverlayEdit()
        this.handleInitialParseResult(epubOverlayEdit)
        this.loadMediaOverlayIfExists(epubOverlayEdit)
        return [parseResult.body, epubOverlayEdit]
      },
    })
  }
}

/******************************************************************************
 * Helpers for loading and parsing XHTML and SMIL files
 ******************************************************************************/

async function handleXml(
  [xhtmlPath, smilPath]: [string | undefined, string | undefined],
  { signal }: { signal: AbortSignal },
): Promise<ParseResult> {
  if (!xhtmlPath) throw new Error("src attribute missing")
  const xhtmlUrl = new URL(xhtmlPath, window.location.origin)
  const xhtmlPromise: Promise<string> = fetch(xhtmlUrl, { signal }).then((response) => {
    if (!response.ok) throw new Error(response.statusText)
    return response.text()
  })
  const smilPromise: Promise<string | undefined> = smilPath
    ? fetch(smilPath, { signal }).then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.text()
      })
    : Promise.resolve(undefined)
  const [xhtml, smil] = await Promise.all([xhtmlPromise, smilPromise])
  return parseXml(xhtml, xhtmlUrl, smil)
}

async function parseXml(xhtml: string, xhtmlUrl: URL, smil: string | undefined): Promise<ParseResult> {
  const parseResult: ParseResult = await parseXhtml(xhtml, xhtmlUrl)
  if (smil) {
    const smilParseResult = parseSmil(smil)
    parseResult.audioSrcSet = smilParseResult.audioSrcSet
    parseResult.parsData = smilParseResult.parsData
  }
  return parseResult
}

async function parseXhtml(xhtml: string, xhtmlUrl: URL): Promise<XhtmlParseResult> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xhtml, "application/xhtml+xml")
  const cssPromises: Promise<[string, URL]>[] = Array.from(doc.head.children)
    .filter(
      (elem) =>
        elem.tagName.toLowerCase() === "link" &&
        (elem.getAttribute("rel") ?? "").toLowerCase() === "stylesheet" &&
        elem.getAttribute("href"),
    )
    .map(async (linkElem) => {
      const cssHref = linkElem.getAttribute("href")!
      const cssUrl = new URL(cssHref, xhtmlUrl)
      const cssResponse = await fetch(cssUrl)
      if (!cssResponse.ok) throw new Error(cssResponse.statusText)
      const css = await cssResponse.text()
      return [css, cssUrl] as [string, URL]
    })
  const cssTexts = await Promise.all(cssPromises)
  const styles: CSSStyleSheet[] = []
  const fontFaceRules: CSSFontFaceRule[] = []
  let isVerticalWritingMode = false
  cssTexts.forEach(([css, cssUrl]) => {
    const cssParseResult = parseCss(css, cssUrl)
    styles.push(cssParseResult.styleSheet)
    fontFaceRules.push(...cssParseResult.fontFaceRules)
    isVerticalWritingMode ||= cssParseResult.isVerticalWritingMode
  })
  const body = Array.from(doc.body.children)
  postprocessBody(body, xhtmlUrl)
  return { body, styles, fontFaceRules, isVerticalWritingMode }
}

function parseCss(css: string, cssUrl: URL): CssParseResult {
  const fontFaceRules: CSSFontFaceRule[] = []
  const styleSheet = new CSSStyleSheet()
  let isVerticalWritingMode = false
  styleSheet.replaceSync(css)
  for (const rule of styleSheet.cssRules) {
    if (rule.constructor.name === "CSSFontFaceRule") {
      const fontFaceRule = rule as CSSFontFaceRule
      // @ts-expect-error Since this is a font face rule, src really exists, trust me!
      const fontFaceSrc = fontFaceRule.style.src as string
      // use regex to parse the url: url(path) -> path
      const fontFaceSrcPath = RE_FONT_FACE_URL.exec(fontFaceSrc)
      if (!fontFaceSrcPath) continue
      const fontFaceUrl = new URL(fontFaceSrcPath[1], cssUrl)
      // @ts-expect-error It is also allowed to set src on font face rules.
      fontFaceRule.style.src = fontFaceSrc.replace(fontFaceSrcPath[1], fontFaceUrl.pathname)
      fontFaceRules.push(fontFaceRule)
    } else if (rule.constructor.name === "CSSStyleRule") {
      const styleRule = rule as CSSStyleRule
      if (["html", "body", ":root"].includes(styleRule.selectorText)) {
        styleRule.selectorText = ":host"
        const writingModeRules: string[] = []
        if (styleRule.styleMap.has("writing-mode"))
          writingModeRules.push(styleRule.styleMap.get("writing-mode")!.toString())
        if (styleRule.styleMap.has("-webkit-writing-mode"))
          writingModeRules.push(styleRule.styleMap.get("-webkit-writing-mode")!.toString())
        if (styleRule.styleMap.has("-epub-writing-mode"))
          writingModeRules.push(styleRule.styleMap.get("-epub-writing-mode")!.toString())
        if (writingModeRules.includes("vertical-rl") || writingModeRules.includes("vertical-lr"))
          isVerticalWritingMode = true
      }
    }
  }
  return { styleSheet, fontFaceRules, isVerticalWritingMode }
}

/**
 * Some postprocessing operations, currently for replacing hyperlinks inside the
 * XHTML document. Modifies the body argument.
 */
function postprocessBody(body: Element[], xhtmlUrl: URL): void {
  const imgElems = body
    .flatMap((elem) => Array.from(elem.getElementsByTagName("img")))
    .filter((elem) => elem.hasAttribute("src"))
  for (const imgElem of imgElems) {
    const imgSrc = imgElem.getAttribute("src")!
    imgElem.setAttribute("src", new URL(imgSrc, xhtmlUrl).pathname)
  }
}

function parseSmil(smil: string): SmilParseResult {
  const parser = new DOMParser()
  const doc = parser.parseFromString(smil, "application/xml")
  const parList = doc.querySelectorAll("par")
  const audioSrcSet = new Set<string>()
  const parsData: ParData[] = []
  for (const parElem of parList) {
    const textElems = parElem.getElementsByTagName("text")
    console.assert(textElems.length > 0, "text element not found: %o", parElem)
    const textElem = textElems.item(0)
    if (!textElem) continue
    console.assert(textElems.length === 1, "multiple text elements found: %o", parElem)
    const audioElems = parElem.getElementsByTagName("audio")
    console.assert(audioElems.length > 0, "audio element not found: %o", parElem)
    const audioElem = audioElems.item(0)
    if (!audioElem) continue
    console.assert(audioElems.length === 1, "multiple audio elements found: %o", parElem)
    const parId = parElem.getAttribute("id")
    const textSrc = textElem.getAttribute("src")
    const audioSrc = audioElem.getAttribute("src")
    const clipBegin = audioElem.getAttribute("clipBegin")
    const clipEnd = audioElem.getAttribute("clipEnd")
    if (parId && textSrc && audioSrc && clipBegin && clipEnd) {
      audioSrcSet.add(audioSrc)
      parsData.push({ parId, textSrc, audioSrc, clipBegin, clipEnd })
    } else {
      console.warn("Incomplete par element: %o", parElem)
    }
  }
  return { audioSrcSet, parsData }
}

/******************************************************************************
 * Helpers for the edit mode functionality
 ******************************************************************************/

function createOverlayTuples(
  body: Element[],
  parsData: ParData[],
  xhtmlUrl: URL,
  smilUrl: URL,
): [ParData, HTMLElement][] {
  const idElemMap = new Map<string, HTMLElement>(
    body.flatMap((elem) =>
      Array.from(elem.getElementsByTagName("*"))
        .filter((elem) => elem.hasAttribute("id"))
        .map((elem) => [elem.getAttribute("id")!, elem] as [string, HTMLElement]),
    ),
  )
  const overlayTuples: [ParData, HTMLElement][] = []
  for (const parData of parsData) {
    const [href, fragment] = parData.textSrc.split("#", 2)
    const parUrl = new URL(href, smilUrl)
    if (xhtmlUrl.pathname !== parUrl.pathname) {
      console.warn(`SMIL: ${href} does not match xhtml ${xhtmlUrl.pathname}`)
      continue
    }
    const elem = idElemMap.get(fragment)
    if (!elem) {
      console.warn(`SMIL: Element with id ${fragment} not found`)
      continue
    }
    overlayTuples.push([parData, elem])
  }
  return overlayTuples
}

function createIdParMap(parsData: ParData[], xhtmlUrl: URL, smilUrl: URL): Map<string, ParData> {
  return new Map(
    parsData
      .map((parData) => {
        const [href, fragment] = parData.textSrc.split("#", 2)
        return [href, fragment, parData] as [string, string, ParData]
      })
      .filter(([href]) => {
        const parUrl = new URL(href, smilUrl)
        return xhtmlUrl.pathname === parUrl.pathname
      })
      .map(([, fragment, parData]) => [fragment, parData] as [string, ParData]),
  )
}

function addModifyOverlayListeners(
  overlayElems: Element[],
  epubOverlayEdit: EpubOverlayEdit,
  abortSignal: AbortSignal,
): void {
  overlayElems.forEach((elem, i) => {
    elem.classList.add("-epub-media-overlay-marked")
    elem.addEventListener(
      "click",
      () => {
        markModifyOverlayElement(overlayElems, i, epubOverlayEdit)
      },
      { signal: abortSignal },
    )
  })
}

function markModifyOverlayElement(overlayElems: Element[], selectedIndex: number, epubOverlayEdit: EpubOverlayEdit) {
  overlayElems.forEach((elemForClassRemove) => {
    elemForClassRemove.classList.remove("-epub-media-overlay-active")
  })
  overlayElems[selectedIndex].classList.add("-epub-media-overlay-active")
  epubOverlayEdit.elems = {
    prev: overlayElems[selectedIndex - 1],
    selected: overlayElems[selectedIndex],
    next: overlayElems[selectedIndex + 1],
  }
}

function addCreateOverlayListeners(
  elems: Element[],
  parsData: ParData[],
  xhtmlUrl: URL,
  epubOverlayEdit: EpubOverlayEdit,
  abortSignal: AbortSignal,
): void {
  const textSrcSet = new Set(parsData.map((parData) => parData.textSrc.split("#", 2)[1]))
  elems.forEach((elem) => {
    elem.addEventListener(
      "click",
      (event: Event) => {
        event.stopPropagation()
        let target: HTMLElement | null = event.target as HTMLElement
        while (!target.hasAttribute("id")) {
          target = target.parentElement
          if (target === null) return
        }
        const textSrcAnchor = target.getAttribute("id")!
        if (textSrcSet.has(textSrcAnchor)) return
        target.classList.add("-epub-media-overlay-create")
        const searchPrevResult = partlyDfs(target, textSrcSet, false)
        const searchNextResult = partlyDfs(target, textSrcSet, true)
        const audioSrcCounter: Record<string, number> = {}
        parsData.forEach((parData) => {
          audioSrcCounter[parData.audioSrc] = (audioSrcCounter[parData.audioSrc] ?? 0) + 1
        })
        const maxAudioSrc = Object.entries(audioSrcCounter)
          .sort(([, a], [, b]) => b - a)
          .at(0)
        const xhtmlName = xhtmlUrl.pathname.split("/").pop()
        epubOverlayEdit.elems = {
          prev: searchPrevResult,
          selected: target,
          next: searchNextResult,
          textSrcNew: `${xhtmlName!}#${textSrcAnchor}`,
          audioSrcNew: maxAudioSrc?.[0],
        }
      },
      { signal: abortSignal },
    )
  })
}

/**
 * Recursively search the next element with an existing overlay id
 * or return null if there is nothing.
 */
function partlyDfs(elem: Element, textSrcSet: Set<string>, forwardSearch: boolean): Element | null {
  const result = dfs(elem, textSrcSet, forwardSearch)
  if (result) return result
  let sibling = forwardSearch ? elem.nextElementSibling : elem.previousElementSibling
  while (sibling) {
    const siblingResult = dfs(sibling, textSrcSet, forwardSearch)
    if (siblingResult) return siblingResult
    sibling = forwardSearch ? sibling.nextElementSibling : sibling.previousElementSibling
  }
  const parentSibling = forwardSearch
    ? elem.parentElement?.nextElementSibling
    : elem.parentElement?.previousElementSibling
  if (parentSibling) return partlyDfs(parentSibling, textSrcSet, forwardSearch)
  return null
}

function dfs(elem: Element, textSrcSet: Set<string>, forwardSearch: boolean): Element | null {
  const textSrc = elem.getAttribute("id")
  if (textSrc && textSrcSet.has(textSrc)) return elem
  const children = Array.from(elem.children)
  if (!forwardSearch) children.reverse()
  for (const child of children) {
    const childTextSrc = dfs(child, textSrcSet, forwardSearch)
    if (childTextSrc) return childTextSrc
  }
  return null
}

/**
 * Remove all relevant media overlay classes from given `element`:
 *
 * - `-epub-media-overlay-active` the element that is currently selected
 * - `-epub-media-overlay-marked` every element that has media overlay data is marked
 * - `-epub-media-overlay-create` an element that has no media overlay data but is selected
 */
function removeMediaOverlayClasses(element: Element) {
  element.classList.remove("-epub-media-overlay-active")
  element.classList.remove("-epub-media-overlay-marked")
  element.classList.remove("-epub-media-overlay-create")
}

/** Adds elements to `elemListeners` and `newOverlayListeners`. */
function initializeMediaOverlay(
  epubOverlayEdit: EpubOverlayEdit,
  xhtmlUrl: URL,
  smilUrl: URL,
  editModeAbortController: AbortController,
  body: Element[],
  parsData: ParData[],
  overlayElems: Element[],
): void {
  epubOverlayEdit.idParMap = createIdParMap(parsData, xhtmlUrl, smilUrl)
  addEditModeListeners(epubOverlayEdit, xhtmlUrl, editModeAbortController, body, parsData, overlayElems)
}

function addEditModeListeners(
  epubOverlayEdit: EpubOverlayEdit,
  xhtmlUrl: URL,
  editModeAbortController: AbortController,
  body: Element[],
  parsData: ParData[],
  overlayElems: Element[],
): void {
  addModifyOverlayListeners(overlayElems, epubOverlayEdit, editModeAbortController.signal)
  addCreateOverlayListeners(body, parsData, xhtmlUrl, epubOverlayEdit, editModeAbortController.signal)
}

function removeEditModeListeners(body: Element[]): void {
  for (const elem of body) {
    removeMediaOverlayClasses(elem)
    for (const descendant of elem.getElementsByTagName("*")) {
      removeMediaOverlayClasses(descendant)
    }
  }
}

/**
 * If no `activeclass` class name is provided by the epub itself, then we use a generic rule
 * for marking elements that are active (i.e. these with current audio playback).
 */
function createMediaOverlayStyle(activeclass: string | undefined): CSSStyleSheet {
  const style = new CSSStyleSheet()
  style.insertRule(".-epub-media-overlay-marked { border: 1px solid; cursor: pointer }")
  style.insertRule(".-epub-media-overlay-marked + .-epub-media-overlay-marked { margin-inline-start: 2em }")
  style.insertRule(".-epub-media-overlay-marked:hover { background-color: var(--sl-color-primary-100) }")
  style.insertRule(".-epub-media-overlay-create { border: 1px dashed}")
  if (!activeclass) {
    style.insertRule(".-epub-media-overlay-active { background-color: var(--sl-color-primary-100) }")
  }
  return style
}

function adoptStylesAndFonts(renderRoot: ShadowRoot, styles: CSSStyleSheet[], fontFaceRules: CSSFontFaceRule[]): void {
  if (fontFaceRules.length > 0) {
    const sheet = new CSSStyleSheet()
    fontFaceRules.forEach((rule) => {
      sheet.insertRule(rule.cssText)
    })
    document.adoptedStyleSheets = [sheet]
  }
  adoptStyles(renderRoot, styles)
}

// @license-end
