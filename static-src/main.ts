// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0

import "./epub-edit";
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
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

import type { SlButton, SlDialog, SlDrawer, SlIconButton } from "@shoelace-style/shoelace";

type ColorModeButtonName = "circle-half" | "moon" | "sun";

const scriptUrl = import.meta.url;
setBasePath(scriptUrl.slice(0, scriptUrl.lastIndexOf("/") + 1));

async function registerServiceWorker(): Promise<void> {
  if ("serviceWorker" in navigator) {
    try {
      const homeButton = document.getElementById("home-button") as SlButton;
      const basePath = homeButton.href;
      void (await navigator.serviceWorker.register(basePath + "sw.js", {
        scope: "/",
      }));
    } catch (error) {
      console.error(`Service worker registration failed with ${error as string}`);
    }
  }
}

function initNavDrawer(): void {
  const navToggleButton = document.getElementById("nav-toggle") as SlIconButton | null;
  const navDrawer = document.getElementById("nav-drawer") as SlDrawer | null;
  const contentContainer = document.getElementById("content");
  if (!navToggleButton || !navDrawer || !contentContainer) return;
  if (Number(localStorage.getItem("nav-open"))) {
    void navDrawer.show();
    contentContainer.classList.add("nav-open");
  } else {
    void navDrawer.hide();
    contentContainer.classList.remove("nav-open");
  }
  navToggleButton.addEventListener("click", function () {
    if (navDrawer.open) {
      void navDrawer.hide();
      contentContainer.classList.remove("nav-open");
      localStorage.setItem("nav-open", "0");
    } else {
      void navDrawer.show();
      contentContainer.classList.add("nav-open");
      localStorage.setItem("nav-open", "1");
    }
  });
}

function initLoginDialog(): void {
  const loginDialog = document.getElementById("login-dialog") as SlDialog | null;
  const loginDialogOpenButton = document.getElementById("login-dialog-open") as SlButton | null;
  if (!loginDialog || !loginDialogOpenButton) return;
  loginDialogOpenButton.addEventListener("click", function () {
    void loginDialog.show();
  });
}

function initColorModeToggle(): void {
  const colorModeToggle = document.getElementById("color-mode-toggle") as SlIconButton | null;
  if (!colorModeToggle) return;
  const colorModeButtonName = (localStorage.getItem("color-mode") ?? "circle-half") as ColorModeButtonName;
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
        const newColorModeName: ColorModeButtonName = "moon";
        colorModeToggle.name = newColorModeName;
        localStorage.setItem("color-mode", newColorModeName);
        prefersColorSchemeDark.onchange = null;
        break;
      }
      case "moon": {
        document.documentElement.classList.remove("sl-theme-dark");
        const newColorModeName: ColorModeButtonName = "sun";
        colorModeToggle.name = newColorModeName;
        localStorage.setItem("color-mode", newColorModeName);
        prefersColorSchemeDark.onchange = null;
        break;
      }
      case "sun": {
        document.documentElement.classList.remove("sl-theme-dark");
        const newColorModeName: ColorModeButtonName = "circle-half";
        colorModeToggle.name = newColorModeName;
        localStorage.setItem("color-mode", newColorModeName);
        initColorSchemeMediaQuery(prefersColorSchemeDark);
        break;
      }
    }
  });
}

function initColorSchemeMediaQuery(prefersColorSchemeDark: MediaQueryList): void {
  if (prefersColorSchemeDark.matches) {
    document.documentElement.classList.add("sl-theme-dark");
  }
  prefersColorSchemeDark.onchange = (event) => {
    if (event.matches) {
      document.documentElement.classList.add("sl-theme-dark");
    } else {
      document.documentElement.classList.remove("sl-theme-dark");
    }
  };
}

function initFormSubmitButtons() {
  const formSubmitButtons = document.getElementsByClassName("form-submit-button") as HTMLCollectionOf<SlButton>;
  Array.from(formSubmitButtons).forEach((button) => {
    const parentForm = button.parentElement as HTMLFormElement | null;
    if (parentForm?.tagName !== "FORM") return;
    button.addEventListener("click", function () {
      if (parentForm.checkValidity()) {
        button.disabled = true;
        button.loading = true;
      }
    });
  });
}

(function () {
  void registerServiceWorker();
  initNavDrawer();
  initLoginDialog();
  initColorModeToggle();
  initFormSubmitButtons();
})();

// @license-end
