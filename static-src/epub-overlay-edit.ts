// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0

import { customElement, property, query } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import type {
  SlAlert,
  SlChangeEvent,
  SlDialog,
  SlIconButton,
  SlInput,
  SlInputEvent,
  SlSelect,
} from "@shoelace-style/shoelace";

export interface ParData {
  parId: string;
  textSrc: string;
  audioSrc: string;
  clipBegin: string;
  clipEnd: string;
}

export interface ParElems {
  prev: Element | null;
  selected: Element;
  next: Element | null;
  textSrcNew?: string; // this is the id for creating new overlays
  audioSrcNew?: string; // used for recommending audio clips
}

const RE_CLOCK = /^(?:(?<hours>\d+):)??(?:(?<minutes>\d+):)??(?<seconds>\d+)(?<fraction>\.\d+)?$/;

@customElement("epub-overlay-edit")
export class EpubOverlayEdit extends LitElement {
  static styles = css`
    .epub-overlay-edit-container {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: var(--sl-color-neutral-100);
      font-size: var(--sl-font-size-large);
      writing-mode: horizontal-tb;
    }

    .vertical-space {
      height: var(--sl-spacing-3x-large);
    }

    sl-input {
      width: 11ch;
    }
  `;

  @property({ attribute: false }) elems?: ParElems;
  idParMap?: Map<string, ParData>;
  audioSrcMap?: Map<string, AudioBuffer>;
  audioContext?: AudioContext;

  @query("#begin-input") private beginInput!: SlInput;
  @query("#end-input") private endInput!: SlInput;
  @query("#commit-button") private commitButton!: SlIconButton;
  @query("#revert-button") private revertButton!: SlIconButton;
  @query("#delete-button") private deleteButton!: SlIconButton;
  @query("#create-button") private createButton!: SlIconButton;
  @query("#create-select") private createSelect!: SlSelect;

  private validateInput(event: SlInputEvent): void {
    this.revertButton.disabled = false;
    const inputElem = event.target as SlInput;
    const match = inputElem.value.match(RE_CLOCK);
    if (match) {
      inputElem.setCustomValidity("");
    } else {
      inputElem.setCustomValidity("Must be a SMIL clock value");
    }
    this.commitButton.disabled = !inputElem.reportValidity();
  }

  private restoreBeginOnOverlap(event: SlChangeEvent): void {
    const prevParId = this.elems?.prev?.getAttribute("id") ?? "";
    const prevPar = this.idParMap?.get(prevParId);
    if (!prevPar) return;
    const inputElem = event.target as SlInput;
    const seconds = clockValueToSeconds(inputElem.value);
    const prevEndSeconds = clockValueToSeconds(prevPar.clipEnd);
    if (seconds < prevEndSeconds) {
      inputElem.value = prevPar.clipEnd;
    }
  }

  private restoreEndOnOverlap(event: SlChangeEvent): void {
    const nextParId = this.elems?.next?.getAttribute("id") ?? "";
    const nextPar = this.idParMap?.get(nextParId);
    if (!nextPar) return;
    const inputElem = event.target as SlInput;
    const seconds = clockValueToSeconds(inputElem.value);
    const nextBeginSeconds = clockValueToSeconds(nextPar.clipBegin);
    if (seconds > nextBeginSeconds) {
      inputElem.value = nextPar.clipBegin;
    }
  }

  private playBuffer(): void {
    const srcId = this.elems?.selected.getAttribute("id") ?? "";
    const parData = this.idParMap?.get(srcId);
    if (!parData) return;
    const buffer = this.audioSrcMap?.get(parData.audioSrc);
    const begin = clockValueToSeconds(this.beginInput.value);
    const end = clockValueToSeconds(this.endInput.value);
    if (!this.audioContext || !buffer) return;
    playBuffer(this.audioContext, buffer, begin, end);
  }

  private disableButtons(): void {
    this.commitButton.disabled = true;
    this.revertButton.disabled = true;
    this.deleteButton.disabled = true;
  }

  private enableButtons(): void {
    this.commitButton.disabled = false;
    this.revertButton.disabled = false;
    this.deleteButton.disabled = false;
  }

  private commit(): void {
    const csrftoken = getCookie("csrftoken");
    const srcId = this.elems?.selected.getAttribute("id") ?? "";
    const parData = this.idParMap?.get(srcId);
    if (!parData || !csrftoken) return;
    const payload: ParData = { ...parData, clipBegin: this.beginInput.value, clipEnd: this.endInput.value };
    this.disableButtons();
    void fetch(window.location.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/html",
        "X-CSRFToken": csrftoken,
      },
      mode: "same-origin",
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = (await response.json()) as { message: string; old: ParData; new: ParData };
          this.beginInput.value = data.new.clipBegin;
          this.endInput.value = data.new.clipEnd;
          parData.clipBegin = data.new.clipBegin;
          parData.clipEnd = data.new.clipEnd;
        } else if (response.headers.get("content-type")?.startsWith("text/html")) {
          showErrorDialog(await response.text(), `Update failed for ID: ${srcId}`);
          this.deleteButton.disabled = false;
        } else {
          const data = (await response.json()) as { message: string };
          notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000);
          this.enableButtons();
        }
      })
      .catch((error) => {
        notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000);
        this.enableButtons();
      });
  }

  private revert(): void {
    const srcId = this.elems?.selected.getAttribute("id") ?? "";
    const parData = this.idParMap?.get(srcId);
    this.beginInput.value = parData?.clipBegin ?? "";
    this.endInput.value = parData?.clipEnd ?? "";
    this.revertButton.disabled = true;
    this.commitButton.disabled = true;
  }

  private delete(): void {
    const csrftoken = getCookie("csrftoken");
    const srcId = this.elems?.selected.getAttribute("id") ?? "";
    const parData = this.idParMap?.get(srcId);
    if (!parData || !csrftoken) return;
    const payload: ParData = { ...parData };
    this.deleteButton.disabled = true;
    void fetch(window.location.href, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/html",
        "X-CSRFToken": csrftoken,
      },
      mode: "same-origin",
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = (await response.json()) as { message: string; old: ParData };
          notify(`Deleted: ${data.message}`, "primary", "info-circle", 5000);
          this.dispatchEvent(new CustomEvent("deleted", { detail: { old: data.old, elems: this.elems } }));
        } else if (response.headers.get("content-type")?.startsWith("text/html")) {
          showErrorDialog(await response.text(), `Delete failed for ID: ${srcId}`);
          this.deleteButton.disabled = false;
        } else {
          const data = (await response.json()) as { message: string };
          notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000);
          this.deleteButton.disabled = false;
        }
      })
      .catch((error) => {
        notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000);
        this.deleteButton.disabled = false;
      });
  }

  private create(): void {
    const csrftoken = getCookie("csrftoken");
    const audioSrc = this.createSelect.value as string;
    const audioBuffer = this.audioSrcMap?.get(audioSrc);
    if (!csrftoken || !this.elems?.textSrcNew || !audioBuffer) return;
    const prevParId = this.elems.prev?.getAttribute("id") ?? "";
    const clipBegin = this.idParMap?.get(prevParId)?.clipEnd;
    const nextParId = this.elems.next?.getAttribute("id") ?? "";
    const clipEnd = this.idParMap?.get(nextParId)?.clipBegin;
    const srcId = this.elems.textSrcNew;
    const payload: ParData = {
      parId: "",
      textSrc: srcId,
      audioSrc: audioSrc,
      clipBegin: clipBegin ?? "0:00:00.000",
      clipEnd: clipEnd ?? secondsToClockValue(audioBuffer.duration),
    };
    this.createButton.disabled = true;
    void fetch(window.location.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/html",
        "X-CSRFToken": csrftoken,
      },
      mode: "same-origin",
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = (await response.json()) as { message: string; new: ParData };
          notify(`Created: ${data.message}`, "primary", "info-circle", 5000);
          this.dispatchEvent(new CustomEvent("created", { detail: { new: data.new, elems: this.elems } }));
        } else if (response.headers.get("content-type")?.startsWith("text/html")) {
          showErrorDialog(await response.text(), `Create failed for ID: ${srcId}`);
          this.deleteButton.disabled = false;
        } else {
          const data = (await response.json()) as { message: string };
          notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000);
          this.createButton.disabled = false;
        }
      })
      .catch((error) => {
        notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000);
        this.createButton.disabled = false;
      });
  }

  protected render() {
    if (this.elems?.textSrcNew) {
      return html` <div class="vertical-space"></div>
        <div class="epub-overlay-edit-container">
          <sl-tooltip placement="top" content="${this.elems.textSrcNew}">
            <sl-input pill disabled value="${this.elems.textSrcNew}" size="small"></sl-input>
          </sl-tooltip>
          <sl-select id="create-select" pill size="small" placement="top" value="${this.elems.audioSrcNew}">
            ${Array.from(this.audioSrcMap!.keys()).map(
              (audioSrc) => html` <sl-option value="${audioSrc}">${audioSrc}</sl-option>`,
            )}
          </sl-select>
          <sl-icon-button
            id="create-button"
            name="check-circle"
            label="create new"
            @click="${this.create}"
          ></sl-icon-button>
        </div>`;
    } else {
      const isDisabled = !this.elems;
      const srcId = this.elems?.selected.getAttribute("id") ?? "";
      const parData = this.idParMap?.get(srcId);
      const begin = parData?.clipBegin ?? "";
      const end = parData?.clipEnd ?? "";
      return html`
        <div class="vertical-space"></div>
        </div>
        <div class="epub-overlay-edit-container">
          <sl-icon-button ?disabled=${isDisabled} name="play-circle" label="play current time selection"
                          @click="${this.playBuffer}"></sl-icon-button>
          <sl-input id="begin-input" ?disabled=${isDisabled} value="${begin}" @sl-input="${this.validateInput}"
                    @sl-change="${this.restoreBeginOnOverlap}" size="small" placeholder="Begin" pill></sl-input>
          <sl-input id="end-input" ?disabled=${isDisabled} value="${end}" @sl-input="${this.validateInput}"
                    @sl-change="${this.restoreEndOnOverlap}" size="small" placeholder="End" pill></sl-input>
          <sl-icon-button id="commit-button" disabled name="check-circle" label="commit change"
                          @click="${this.commit}"></sl-icon-button>
          <sl-icon-button id="revert-button" disabled name="arrow-left-circle" label="revert change"
                          @click="${this.revert}"></sl-icon-button>
          <sl-icon-button id="delete-button" name="trash" label="delete overlay"
                          @click="${this.delete}"></sl-icon-button>
        </div>`;
    }
  }
}

/** https://www.w3.org/TR/SMIL3/smil-timing.html#q22 */
export function clockValueToSeconds(clockValue: string): number {
  const match = clockValue.trim().match(RE_CLOCK);
  if (!match?.groups) throw new Error(`Invalid clock value: ${clockValue}`);
  const groups = match.groups;
  let seconds = parseInt(groups.seconds, 10);
  if (groups.minutes) seconds += parseInt(groups.minutes, 10) * 60;
  if (groups.hours) seconds += parseInt(groups.hours, 10) * 3600;
  if (groups.fraction) seconds += parseFloat(groups.fraction);
  return seconds;
}

function secondsToClockValue(sec: number): string {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);
  const fraction = (sec % 1).toFixed(3).slice(1);
  return `${hours}:${minutes}:${seconds}${fraction}`;
}

export function playBuffer(audioContext: AudioContext, buffer: AudioBuffer, begin: number, end: number): void {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0, begin, end - begin);
}

function getCookie(name: string): string | null {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (const item of cookies) {
      const cookie = item.trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

/** https://shoelace.style/components/alert */
function notify(
  message: string,
  variant: "primary" | "success" | "neutral" | "warning" | "danger",
  icon: string,
  duration: number,
): void {
  const div = document.createElement("div");
  div.textContent = message;
  const escaped = div.innerHTML;
  const alert: SlAlert = Object.assign(document.createElement("sl-alert"), {
    variant,
    closable: true,
    duration: duration,
    innerHTML: `
        <sl-icon name="${icon}" slot="icon"></sl-icon>
        ${escaped}
      `,
  });
  document.body.append(alert);
  switch (variant) {
    // case "primary":
    //   console.log(escaped);
    //   break;
    // case "success":
    //   console.log(escaped);
    //   break;
    // case "neutral":
    //   console.log(escaped);
    //   break;
    case "warning":
      console.warn(escaped);
      break;
    case "danger":
      console.error(escaped);
      break;
  }
  void alert.toast();
}

/**
 * In Django's debug mode, we get a full HTML page as the error response.
 * We can't use the alert component in this case, so we need to create a dialog
 * for nicer error messages.
 */
function showErrorDialog(html: string, label?: string): void {
  const errorDialog = document.getElementById("error-dialog") as SlDialog | null;
  if (!errorDialog) {
    notify(html, "danger", "exclamation-octagon", 5000);
    return;
  }
  if (label) errorDialog.label = label;
  errorDialog.innerHTML = html;
  void errorDialog.show();
}

// @license-end
