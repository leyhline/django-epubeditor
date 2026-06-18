/** @import { SlButton, SlDrawer, SlIconButton, SlIcon, SlSpinner } from '@shoelace-style/shoelace' */
/** @import { EpubEdit } from './epub-edit' */
/** @import { EpubOverlayEdit } from './epub-overlay-edit' */
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
import "./epub-edit";
import "./epub-overlay-edit";
import "./main.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/themes/dark.css";
import "./theme.css";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";
import "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";
import "@shoelace-style/shoelace/dist/components/radio/radio.js";
import "@shoelace-style/shoelace/dist/components/radio-group/radio-group.js";
import "@shoelace-style/shoelace/dist/components/range/range.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
const scriptUrl = import.meta.url;
setBasePath(scriptUrl.slice(0, scriptUrl.lastIndexOf("/") + 1));
/**
 * @returns {Promise<void>}
 */
async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            const homeButton = document.getElementById("home-button");
            const basePath = homeButton.href;
            void (await navigator.serviceWorker.register(basePath + "sw.js", {
                scope: "/",
            }));
        }
        catch (error) {
            console.error(`Service worker registration failed with ${error}`);
        }
    }
}
/**
 * @returns {void}
 */
function initNavDrawer() {
    const navToggleButton = document.getElementById("nav-toggle");
    const navDrawer = document.getElementById("nav-drawer");
    const contentContainer = document.getElementById("content");
    if (!navToggleButton || !navDrawer || !contentContainer)
        return;
    if (Number(localStorage.getItem("nav-open"))) {
        void navDrawer.show();
        contentContainer.classList.add("nav-open");
    }
    else {
        void navDrawer.hide();
        contentContainer.classList.remove("nav-open");
    }
    navToggleButton.addEventListener("click", function () {
        if (navDrawer.open) {
            void navDrawer.hide();
            contentContainer.classList.remove("nav-open");
            localStorage.setItem("nav-open", "0");
        }
        else {
            void navDrawer.show();
            contentContainer.classList.add("nav-open");
            localStorage.setItem("nav-open", "1");
        }
    });
}
/**
 * @returns {void}
 */
function initColorModeToggle() {
    const colorModeToggle = document.getElementById("color-mode-toggle");
    if (!colorModeToggle)
        return;
    const colorModeButtonName = (localStorage.getItem("color-mode") ?? "circle-half");
    const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");
    // color mode initialization
    switch (colorModeButtonName) {
        case "circle-half": {
            initColorSchemeMediaQuery(prefersColorSchemeDark);
            break;
        }
        case "moon": {
            document.documentElement.classList.add("sl-theme-dark");
            break;
        }
        case "sun": {
            document.documentElement.classList.remove("sl-theme-dark");
            break;
        }
    }
    colorModeToggle.name = colorModeButtonName;
    colorModeToggle.addEventListener("click", function () {
        // color mode toggle logic
        switch (colorModeToggle.name) {
            case "circle-half": {
                document.documentElement.classList.add("sl-theme-dark");
                const newColorModeName = "moon";
                colorModeToggle.name = newColorModeName;
                localStorage.setItem("color-mode", newColorModeName);
                prefersColorSchemeDark.onchange = null;
                break;
            }
            case "moon": {
                document.documentElement.classList.remove("sl-theme-dark");
                const newColorModeName = "sun";
                colorModeToggle.name = newColorModeName;
                localStorage.setItem("color-mode", newColorModeName);
                prefersColorSchemeDark.onchange = null;
                break;
            }
            case "sun": {
                document.documentElement.classList.remove("sl-theme-dark");
                const newColorModeName = "circle-half";
                colorModeToggle.name = newColorModeName;
                localStorage.setItem("color-mode", newColorModeName);
                initColorSchemeMediaQuery(prefersColorSchemeDark);
                break;
            }
        }
    });
}
/**
 * @param {MediaQueryList} prefersColorSchemeDark
 * @returns {void}
 */
function initColorSchemeMediaQuery(prefersColorSchemeDark) {
    if (prefersColorSchemeDark.matches) {
        document.documentElement.classList.add("sl-theme-dark");
    }
    prefersColorSchemeDark.onchange = (event) => {
        if (event.matches) {
            document.documentElement.classList.add("sl-theme-dark");
        }
        else {
            document.documentElement.classList.remove("sl-theme-dark");
        }
    };
}
/**
 * @returns {void}
 */
function initFormSubmitButtons() {
    const formSubmitButtons = document.getElementsByClassName("form-submit-button");
    Array.from(formSubmitButtons).forEach((button) => {
        const parentForm = button.parentElement;
        if (parentForm?.tagName !== "FORM")
            return;
        button.addEventListener("click", function () {
            if (parentForm.checkValidity()) {
                button.disabled = true;
                button.loading = true;
            }
        });
    });
}
/**
 * @returns {SlIconButton[]}
 */
function getIconButtons() {
    const epubEditElement = document.getElementById("epub-edit");
    const epubOverlayEditElement = document.getElementById("epub-overlay-edit");
    const iconButtons = [];
    const documentButtonIds = ["undo-button", "redo-button"];
    documentButtonIds.forEach((elementId) => {
        const element = document.getElementById(elementId);
        if (element)
            iconButtons.push(element);
    });
    const epubEditButtonIds = ["prev-merge-button", "next-merge-button", "split-button"];
    epubEditButtonIds.forEach((elementId) => {
        if (!epubEditElement || !epubEditElement.shadowRoot)
            return;
        const element = epubEditElement.shadowRoot.getElementById(elementId);
        if (element)
            iconButtons.push(element);
    });
    const epubOverlayEditButtonIds = ["commit-button", "delete-button", "create-button"];
    epubOverlayEditButtonIds.forEach((elementId) => {
        if (!epubOverlayEditElement || !epubOverlayEditElement.shadowRoot)
            return;
        const element = epubOverlayEditElement.shadowRoot.getElementById(elementId);
        if (element)
            iconButtons.push(element);
    });
    return iconButtons;
}
/**
 * @returns {void}
 */
function initDisconnectedIndicator() {
    window.addEventListener("online", () => {
        const spinnerIcon = document.getElementById("header-spinner-icon");
        if (spinnerIcon)
            spinnerIcon.style.display = "inline-flex";
        const disconnectedIcon = document.getElementById("header-disconnected-icon");
        if (disconnectedIcon)
            disconnectedIcon.style.display = "none";
        const buttons = getIconButtons();
        buttons.forEach((button) => {
            button.disabled = false;
        });
    });
    window.addEventListener("offline", () => {
        const spinnerIcon = document.getElementById("header-spinner-icon");
        if (spinnerIcon)
            spinnerIcon.style.display = "none";
        const disconnectedIcon = document.getElementById("header-disconnected-icon");
        if (disconnectedIcon)
            disconnectedIcon.style.display = "inline-block";
        const buttons = getIconButtons();
        buttons.forEach((button) => {
            console.log(button);
            button.disabled = true;
        });
    });
}
;
(function () {
    void registerServiceWorker();
    initNavDrawer();
    initColorModeToggle();
    initFormSubmitButtons();
    initDisconnectedIndicator();
})();
// @license-end
/** @typedef {"circle-half" | "moon" | "sun"} ColorModeButtonName */
