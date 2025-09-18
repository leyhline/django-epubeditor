// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0

import { customElement, property, query } from "lit/decorators.js"
import { css, html, LitElement, nothing, PropertyValues } from "lit"
import type { SlAlert, SlChangeEvent, SlDialog, SlInput, SlInputEvent, SlSelect } from "@shoelace-style/shoelace"
import SlIconButton from "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js"

export interface ParData {
  parId: string
  textSrc: string
  audioSrc: string
  clipBegin: string
  clipEnd: string
}

export interface ParElems {
  prev: Element | null
  selected: Element
  next: Element | null
  textSrcNew?: string // this is the id for creating new overlays
  audioSrcNew?: string // used for recommending audio clips
}

interface MergePayload {
  op: "MERGE"
  parId: string
  otherParId: string
}

interface SplitPayload {
  op: "SPLIT"
  parId: string
  index: number
}

interface HistoryPayload {
  op: "UNDO" | "REDO"
}

interface ModifyResponse {
  message: "OK"
  old?: ParData
  new?: ParData
  textId?: string
}

interface ErrorResponse {
  message: string
}

type ModifyPayload = ParData & { op: "CREATE" | "DELETE" | "UPDATE" }

const RE_CLOCK = /^(?:(?<hours>\d+):)??(?:(?<minutes>\d+):)??(?<seconds>\d+)(?<fraction>\.\d+)?$/

@customElement("epub-overlay-edit")
export class EpubOverlayEdit extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: var(--sl-color-neutral-100);
      writing-mode: horizontal-tb;
    }

    .epub-overlay-edit-container {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: var(--sl-font-size-large);
    }

    sl-input {
      width: 11ch;
    }

    canvas {
      height: 50px;
      width: 100%;
    }
  `

  @property({ attribute: false }) elems?: ParElems
  @property({ attribute: false }) isVerticalWritingMode = false
  @property({ attribute: false }) idParMap?: Map<string, ParData>
  audioSrcMap?: Map<string, AudioBuffer>
  audioContext?: AudioContext
  private renderContext?: CanvasRenderingContext2D
  private canvasIntersectionObserver?: IntersectionObserver
  private samplesSrcMap = new Map<string, [Float32Array, number]>()
  private prevMergeButton: SlIconButton | null = null
  private nextMergeButton: SlIconButton | null = null
  private originalSelectedElement?: Element
  private splitButton: SlIconButton | null = null

  @query("#begin-input") private beginInput!: SlInput
  @query("#end-input") private endInput!: SlInput
  @query("#commit-button") private commitButton!: SlIconButton
  @query("#revert-button") private revertButton!: SlIconButton
  @query("#delete-button") private deleteButton!: SlIconButton
  @query("#create-button") private createButton!: SlIconButton
  @query("#create-select") private createSelect!: SlSelect
  @query("#waveform-target") private waveformCanvas?: HTMLCanvasElement

  private validateInput(event: SlInputEvent): void {
    this.revertButton.disabled = false
    const inputElem = event.target as SlInput
    const isNumber = inputElem.value && !isNaN(Number(inputElem.value))
    if (isNumber) {
      inputElem.setCustomValidity("")
    } else {
      inputElem.setCustomValidity("Must be a number")
    }
    this.commitButton.disabled = !inputElem.reportValidity()
    this.renderWaveform()
  }

  private restoreBeginOnOverlap(event: SlChangeEvent): void {
    const prevParId = this.elems?.prev?.getAttribute("id") ?? ""
    const prevPar = this.idParMap?.get(prevParId)
    if (!prevPar) return
    const inputElem = event.target as SlInput
    const seconds = Number(inputElem.value)
    const prevEndSeconds = clockValueToSeconds(prevPar.clipEnd)
    if (seconds < prevEndSeconds) {
      inputElem.value = clockValueToSeconds(prevPar.clipEnd).toString()
    }
  }

  private restoreEndOnOverlap(event: SlChangeEvent): void {
    const nextParId = this.elems?.next?.getAttribute("id") ?? ""
    const nextPar = this.idParMap?.get(nextParId)
    if (!nextPar) return
    const inputElem = event.target as SlInput
    const seconds = Number(inputElem.value)
    const nextBeginSeconds = clockValueToSeconds(nextPar.clipBegin)
    if (seconds > nextBeginSeconds) {
      inputElem.value = clockValueToSeconds(nextPar.clipBegin).toString()
    }
  }

  private playBuffer(): void {
    const srcId = this.elems?.selected.getAttribute("id") ?? ""
    const parData = this.idParMap?.get(srcId)
    if (!parData) return
    const buffer = this.audioSrcMap?.get(parData.audioSrc)
    const begin = clockValueToSeconds(this.beginInput.value)
    const end = clockValueToSeconds(this.endInput.value)
    if (!this.audioContext || !buffer) return
    playBuffer(this.audioContext, buffer, begin, end)
  }

  private disableButtons(): void {
    this.commitButton.disabled = true
    this.revertButton.disabled = true
    this.deleteButton.disabled = true
  }

  private enableButtons(): void {
    this.commitButton.disabled = false
    this.revertButton.disabled = false
    this.deleteButton.disabled = false
  }

  private merge(isNext: boolean): void {
    const csrftoken = getCookie("csrftoken")
    const srcId = this.elems?.selected.getAttribute("id") ?? ""
    let otherId: string
    let button: SlIconButton | null
    if (isNext) {
      otherId = this.elems?.next?.getAttribute("id") ?? ""
      button = this.nextMergeButton
    } else {
      otherId = this.elems?.prev?.getAttribute("id") ?? ""
      button = this.prevMergeButton
    }
    if (!this.idParMap || !this.idParMap.has(srcId) || !this.idParMap.has(otherId) || !button || !csrftoken) return
    const parData = this.idParMap.get(srcId)!
    const otherParData = this.idParMap.get(otherId)!
    const payload: MergePayload = { op: "MERGE", parId: parData.parId, otherParId: otherParData.parId }
    button.disabled = true
    void callEndpoint(payload, csrftoken)
      .then(async (response) => {
        if (response.ok) {
          const { message, textId } = (await response.json()) as ModifyResponse
          notify(`Merged: ${message}`, "primary", "info-circle", 5000)
          this.dispatchEvent(new CustomEvent("restructured", { detail: { textId } }))
        } else if (response.headers.get("content-type")?.startsWith("text/html")) {
          showErrorDialog(await response.text(), `Update failed for ID: ${srcId}`)
        } else {
          const data = (await response.json()) as { message: string }
          notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000)
        }
      })
      .catch((error: unknown) => {
        notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000)
      })
      .finally(() => {
        button.disabled = false
      })
  }

  private split(splitAfterIndex: number): void {
    const csrftoken = getCookie("csrftoken")
    const srcId = this.elems?.selected.getAttribute("id") ?? ""
    const parData = this.idParMap?.get(srcId)
    if (!csrftoken || !this.splitButton || !parData) return
    const payload: SplitPayload = { op: "SPLIT", parId: parData.parId, index: splitAfterIndex }
    this.splitButton.disabled = true
    void callEndpoint(payload, csrftoken)
      .then(async (response) => {
        if (response.ok) {
          const { message, textId } = (await response.json()) as ModifyResponse
          notify(`Split: ${message}`, "primary", "info-circle", 5000)
          this.dispatchEvent(new CustomEvent("restructured", { detail: { textId } }))
        } else if (response.headers.get("content-type")?.startsWith("text/html")) {
          showErrorDialog(await response.text(), `Update failed for ID: ${srcId}`)
          this.deleteButton.disabled = false
        } else {
          const data = (await response.json()) as ErrorResponse
          notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000)
        }
      })
      .catch((error: unknown) => {
        notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000)
      })
      .finally(() => {
        this.splitButton!.disabled = false
      })
  }

  private commit(): void {
    const csrftoken = getCookie("csrftoken")
    const srcId = this.elems?.selected.getAttribute("id") ?? ""
    const parData = this.idParMap?.get(srcId)
    if (!parData || !csrftoken) return
    const payload: ModifyPayload = {
      ...parData,
      clipBegin: secondsToClockValue(Number(this.beginInput.value)),
      clipEnd: secondsToClockValue(Number(this.endInput.value)),
      op: "UPDATE",
    }
    this.disableButtons()
    void callEndpoint(payload, csrftoken)
      .then(async (response) => {
        if (response.ok) {
          const data = (await response.json()) as ModifyResponse
          notify(`Updated: ${data.message}`, "primary", "info-circle", 5000)
          this.beginInput.value = clockValueToSeconds(data.new!.clipBegin).toString()
          this.endInput.value = clockValueToSeconds(data.new!.clipEnd).toString()
          parData.clipBegin = data.new!.clipBegin
          parData.clipEnd = data.new!.clipEnd
        } else if (response.headers.get("content-type")?.startsWith("text/html")) {
          showErrorDialog(await response.text(), `Update failed for ID: ${srcId}`)
          this.deleteButton.disabled = false
        } else {
          const data = (await response.json()) as ErrorResponse
          notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000)
          this.enableButtons()
        }
      })
      .catch((error: unknown) => {
        notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000)
        this.enableButtons()
      })
  }

  private revert(): void {
    const srcId = this.elems?.selected.getAttribute("id") ?? ""
    const parData = this.idParMap?.get(srcId)
    this.beginInput.value = clockValueToSeconds(parData?.clipBegin ?? "").toString()
    this.endInput.value = clockValueToSeconds(parData?.clipEnd ?? "").toString()
    this.revertButton.disabled = true
    this.commitButton.disabled = true
    this.renderWaveform()
  }

  private delete(): void {
    const csrftoken = getCookie("csrftoken")
    const srcId = this.elems?.selected.getAttribute("id") ?? ""
    const parData = this.idParMap?.get(srcId)
    if (!parData || !csrftoken) return
    const payload: ModifyPayload = { ...parData, op: "DELETE" }
    this.deleteButton.disabled = true
    void callEndpoint(payload, csrftoken)
      .then(async (response) => {
        if (response.ok) {
          const { message } = (await response.json()) as ModifyResponse
          notify(`Deleted: ${message}`, "primary", "info-circle", 5000)
          this.dispatchEvent(new CustomEvent("restructured", { detail: { textId: null } }))
        } else if (response.headers.get("content-type")?.startsWith("text/html")) {
          showErrorDialog(await response.text(), `Delete failed for ID: ${srcId}`)
          this.deleteButton.disabled = false
        } else {
          const data = (await response.json()) as ErrorResponse
          notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000)
          this.deleteButton.disabled = false
        }
      })
      .catch((error: unknown) => {
        notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000)
        this.deleteButton.disabled = false
      })
  }

  private create(): void {
    const csrftoken = getCookie("csrftoken")
    const audioSrc = this.createSelect.value as string
    const audioBuffer = this.audioSrcMap?.get(audioSrc)
    if (!csrftoken || !this.elems?.textSrcNew || !audioBuffer) return
    const prevParId = this.elems.prev?.getAttribute("id") ?? ""
    const clipBegin = this.idParMap?.get(prevParId)?.clipEnd
    const nextParId = this.elems.next?.getAttribute("id") ?? ""
    const clipEnd = this.idParMap?.get(nextParId)?.clipBegin
    const srcId = this.elems.textSrcNew
    const payload: ModifyPayload = {
      parId: "",
      textSrc: srcId,
      audioSrc: audioSrc,
      clipBegin: clipBegin ?? "0:00:00.000",
      clipEnd: clipEnd ?? secondsToClockValue(audioBuffer.duration),
      op: "CREATE",
    }
    this.createButton.disabled = true
    void callEndpoint(payload, csrftoken)
      .then(async (response) => {
        if (response.ok) {
          const { message, textId } = (await response.json()) as ModifyResponse
          notify(`Created: ${message}`, "primary", "info-circle", 5000)
          this.dispatchEvent(new CustomEvent("restructured", { detail: { textId } }))
        } else if (response.headers.get("content-type")?.startsWith("text/html")) {
          showErrorDialog(await response.text(), `Create failed for ID: ${srcId}`)
          this.deleteButton.disabled = false
        } else {
          const data = (await response.json()) as ErrorResponse
          notify(`Server error: ${data.message}`, "danger", "exclamation-octagon", 5000)
          this.createButton.disabled = false
        }
      })
      .catch((error: unknown) => {
        notify(`Error: ${error}`, "danger", "exclamation-octagon", 5000)
        this.createButton.disabled = false
      })
  }

  private registerAdjustCanvasWidthEvent(): void {
    // calculate new canvas width on browser window resize
    window.addEventListener(
      "resize",
      () => {
        if (this.waveformCanvas) {
          this.waveformCanvas.width = this.waveformCanvas.getBoundingClientRect().width
          this.renderWaveform()
        }
      },
      true,
    )
  }

  protected firstUpdated(): void {
    this.registerAdjustCanvasWidthEvent()
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    this.removeMergeButtons()
    const previousElems = changedProperties.get("elems")
    if (previousElems) {
      this.removeSplitEvents(previousElems.selected)
    }
  }

  protected updated(): void {
    if (this.renderContext) {
      const { width, height } = this.renderContext.canvas
      this.renderContext.clearRect(0, 0, width, height)
    }
    if (this.canvasIntersectionObserver) {
      this.canvasIntersectionObserver.disconnect()
    }
    if (this.waveformCanvas) {
      const renderContext = this.waveformCanvas.getContext("2d")
      if (!renderContext) return
      this.renderContext = renderContext
      this.canvasIntersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry.intersectionRatio > 0 && this.waveformCanvas) {
            this.waveformCanvas.width = entry.boundingClientRect.width
            this.renderWaveform()
          }
        },
        { root: this },
      )
      this.canvasIntersectionObserver.observe(this.waveformCanvas)
      this.renderWaveform()
    }
  }

  private renderWaveform(): void {
    if (!this.renderContext || !this.audioContext || !this.elems) return
    const srcId = this.elems.selected.getAttribute("id") ?? ""
    const parData = this.idParMap?.get(srcId)
    if (!parData) return

    let prevInterval: [number, number] | null = null
    if (this.elems.prev) {
      const prevParId = this.elems.prev.getAttribute("id") ?? ""
      const prevPar = this.idParMap?.get(prevParId)
      if (prevPar) {
        prevInterval = [clockValueToSeconds(prevPar.clipBegin), clockValueToSeconds(prevPar.clipEnd)]
      }
    }
    let nextInterval: [number, number] | null = null
    if (this.elems.next) {
      const nextParId = this.elems.next.getAttribute("id") ?? ""
      const nextPar = this.idParMap?.get(nextParId)
      if (nextPar) {
        nextInterval = [clockValueToSeconds(nextPar.clipBegin), clockValueToSeconds(nextPar.clipEnd)]
      }
    }

    const buffer = this.audioSrcMap?.get(parData.audioSrc)
    if (!buffer) return
    let samples: Float32Array
    let max: number
    if (this.samplesSrcMap.has(parData.audioSrc)) {
      ;[samples, max] = this.samplesSrcMap.get(parData.audioSrc)!
    } else {
      ;[samples, max] = downmixToMono(buffer)
      this.samplesSrcMap.set(parData.audioSrc, [samples, max])
    }
    const begin = clockValueToSeconds(this.beginInput.value)
    const end = clockValueToSeconds(this.endInput.value)
    drawSelection(
      this.renderContext,
      samples,
      max,
      prevInterval,
      [begin, end],
      nextInterval,
      removeRuby(this.elems.selected),
      this.audioContext.sampleRate,
    )
  }

  private addMergeButtons(): void {
    if (!this.elems) return
    ;[this.prevMergeButton, this.nextMergeButton] = createMergeButtons(this.elems, this.isVerticalWritingMode)
    if (this.prevMergeButton) {
      this.prevMergeButton.onclick = () => {
        this.merge(false)
      }
    }
    if (this.nextMergeButton) {
      this.nextMergeButton.onclick = () => {
        this.merge(true)
      }
    }
  }

  private removeMergeButtons(): void {
    if (this.prevMergeButton) this.prevMergeButton.remove()
    if (this.nextMergeButton) this.nextMergeButton.remove()
  }

  private addSplitEvents(): void {
    this.addSplitButtonsListeners()
    this.addSplitButtonsEvents()
  }

  private removeSplitEvents(previousSelectedElement: Element): void {
    if (this.originalSelectedElement) {
      previousSelectedElement.replaceChildren(...this.originalSelectedElement.childNodes)
      this.originalSelectedElement = undefined
    }
  }

  private addSplitButtonsListeners(): void {
    if (!this.elems) return
    this.originalSelectedElement = this.elems.selected.cloneNode(true) as Element
    const nodes: Node[] = []
    for (const node of this.elems.selected.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node as Text
        for (const char of text.data) {
          const charNode = document.createTextNode(char)
          const spanElem = document.createElement("span")
          spanElem.appendChild(charNode)
          nodes.push(spanElem)
        }
      } else {
        nodes.push(node)
      }
    }
    this.elems.selected.replaceChildren(...nodes)
  }

  private addSplitButtonsEvents(): void {
    if (!this.elems) return
    for (let i = 1; i < this.elems.selected.children.length; i++) {
      const elem = this.elems.selected.children[i] as HTMLElement
      let splitIconButton: SlIconButton | null = null
      elem.onclick = (event) => {
        event.stopPropagation()
        splitIconButton = new SlIconButton()
        splitIconButton.id = "split-button"
        splitIconButton.name = this.isVerticalWritingMode ? "arrows-expand" : "arrows-expand-vertical"
        splitIconButton.label = "Split media overlay and corresponding text"
        splitIconButton.onclick = (event) => {
          event.stopPropagation()
          this.split(i - 1)
        }
        elem.insertAdjacentElement("beforebegin", splitIconButton)
        if (this.splitButton) this.splitButton.remove()
        this.splitButton = splitIconButton
      }
      elem.onmouseenter = () => {
        elem.style.borderInlineStart = "1px solid"
      }
      elem.onmouseleave = () => {
        elem.style.borderInlineStart = ""
      }
    }
  }

  protected render() {
    if (!this.elems) {
      return nothing
    }
    if (this.elems.textSrcNew) {
      return html`<div class="epub-overlay-edit-container">
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
      </div>`
    } else {
      this.addSplitEvents()
      this.addMergeButtons()
      const isDisabled = !this.elems
      const srcId = this.elems.selected.getAttribute("id") ?? ""
      const parData = this.idParMap?.get(srcId)
      const begin = clockValueToSeconds(parData?.clipBegin ?? "")
      const end = clockValueToSeconds(parData?.clipEnd ?? "")
      return html`<canvas id="waveform-target" height="50"></canvas>
        <div class="epub-overlay-edit-container">
          <sl-icon-button
            ?disabled=${isDisabled}
            name="play-circle"
            label="play current time selection"
            @click="${this.playBuffer}"
          ></sl-icon-button>
          <sl-input
            id="begin-input"
            ?disabled=${isDisabled}
            value="${begin}"
            type="number"
            step="0.05"
            @sl-input="${this.validateInput}"
            @sl-change="${this.restoreBeginOnOverlap}"
            size="small"
            placeholder="Begin"
            pill
          ></sl-input>
          <sl-input
            id="end-input"
            ?disabled=${isDisabled}
            value="${end}"
            type="number"
            step="0.05"
            @sl-input="${this.validateInput}"
            @sl-change="${this.restoreEndOnOverlap}"
            size="small"
            placeholder="End"
            pill
          ></sl-input>
          <sl-icon-button
            id="commit-button"
            disabled
            name="check-circle"
            label="commit change"
            @click="${this.commit}"
          ></sl-icon-button>
          <sl-icon-button
            id="revert-button"
            disabled
            name="arrow-left-circle"
            label="revert change"
            @click="${this.revert}"
          ></sl-icon-button>
          <sl-icon-button
            id="delete-button"
            name="trash"
            label="delete overlay"
            @click="${this.delete}"
          ></sl-icon-button>
        </div>`
    }
  }
}

/** https://www.w3.org/TR/SMIL3/smil-timing.html#q22 */
export function clockValueToSeconds(clockValue: string): number {
  const match = RE_CLOCK.exec(clockValue.trim())
  if (!match?.groups) throw new Error(`Invalid clock value: ${clockValue}`)
  const groups = match.groups
  let seconds = parseInt(groups.seconds, 10)
  if (groups.minutes) seconds += parseInt(groups.minutes, 10) * 60
  if (groups.hours) seconds += parseInt(groups.hours, 10) * 3600
  if (groups.fraction) seconds += parseFloat(groups.fraction)
  return seconds
}

function secondsToClockValue(sec: number): string {
  const hours = Math.floor(sec / 3600).toString().padStart(2, "0")
  const minutes = Math.floor((sec % 3600) / 60).toString().padStart(2, "0")
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0")
  const fraction = (sec % 1).toFixed(3).slice(1).toString()
  return `${hours}:${minutes}:${seconds}${fraction}`
}

export function playBuffer(audioContext: AudioContext, buffer: AudioBuffer, begin: number, end: number): void {
  const source = audioContext.createBufferSource()
  source.buffer = buffer
  source.connect(audioContext.destination)
  source.start(0, begin, end - begin)
}

function getCookie(name: string): string | null {
  let cookieValue = null
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";")
    for (const item of cookies) {
      const cookie = item.trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

/** https://shoelace.style/components/alert */
function notify(
  message: string,
  variant: "primary" | "success" | "neutral" | "warning" | "danger",
  icon: "exclamation-octagon" | "info-circle",
  duration: number,
): void {
  const div = document.createElement("div")
  div.textContent = message
  const escaped = div.innerHTML
  const alert: SlAlert = Object.assign(document.createElement("sl-alert"), {
    variant,
    closable: true,
    duration: duration,
    innerHTML: `
        <sl-icon name="${icon}" slot="icon"></sl-icon>
        ${escaped}
      `,
  })
  document.body.append(alert)
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
      console.warn(escaped)
      break
    case "danger":
      console.error(escaped)
      break
  }
  void alert.toast()
}

/**
 * In Django's debug mode, we get a full HTML page as the error response.
 * We can't use the alert component in this case, so we need to create a dialog
 * for nicer error messages.
 */
function showErrorDialog(html: string, label?: string): void {
  const errorDialog = document.getElementById("error-dialog") as SlDialog | null
  if (!errorDialog) {
    notify(html, "danger", "exclamation-octagon", 5000)
    return
  }
  errorDialog.label = label ?? "Operation failed"
  const iframeElem = document.createElement("iframe")
  iframeElem.toggleAttribute("sandbox")
  iframeElem.title = label ?? "Operation failed"
  iframeElem.srcdoc = html
  iframeElem.style.width = "100%"
  iframeElem.style.height = "100%"
  errorDialog.replaceChildren(iframeElem)
  void errorDialog.show()
}

function downmixToMono(buffer: AudioBuffer): [Float32Array, number] {
  const nrChans = buffer.numberOfChannels
  const channels = []
  for (let chan = 0; chan < nrChans; chan++) {
    channels.push(buffer.getChannelData(chan))
  }
  let max = 0
  const samples = new Float32Array(buffer.length)
  for (let i = 0; i < buffer.length; i++) {
    for (let chan = 0; chan < nrChans; chan++) {
      samples[i] += channels[chan][i]
    }
    const value = Math.abs(samples[i])
    if (value > max) max = value
  }
  return [samples, max]
}

function drawSelection(
  ctx: CanvasRenderingContext2D,
  samples: Float32Array,
  max: number,
  prevInterval: [number, number] | null,
  [begin, end]: [number, number],
  nextInterval: [number, number] | null,
  text: string,
  sampleRate: number,
): void {
  const { width } = ctx.canvas
  console.assert(begin < end)

  ctx.font = "24px Noto Serif JP"
  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
  const textWidth = ctx.measureText(text).width
  let offsetDivisor = (textWidth / width) * 10
  offsetDivisor = Math.min(offsetDivisor, 16)
  offsetDivisor = Math.max(offsetDivisor, 1)

  const offset = Math.round(((end - begin) * sampleRate) / offsetDivisor)
  const beginSample = Math.round(sampleRate * begin - offset)
  const endSample = Math.round(sampleRate * end + offset)
  const length = endSample - beginSample
  const scale = width / length

  if (prevInterval) {
    const [prevBegin, prevEnd] = prevInterval
    const prevBeginX = Math.max(0, (Math.round(prevBegin * sampleRate) - beginSample) * scale)
    const prevEndX = Math.max(0, (Math.round(prevEnd * sampleRate) - beginSample) * scale)
    if (prevBeginX < prevEndX) {
      drawFullHeightRect(ctx, prevBeginX, prevEndX, "#ddd")
    }
  }

  if (nextInterval) {
    const [nextBegin, nextEnd] = nextInterval
    const nextBeginX = Math.min(Math.round(length * scale), (Math.round(nextBegin * sampleRate) - beginSample) * scale)
    const nextEndX = Math.min(Math.round(length * scale), (Math.round(nextEnd * sampleRate) - beginSample) * scale)
    if (nextBeginX < nextEndX) {
      drawFullHeightRect(ctx, nextBeginX, nextEndX, "#ddd")
    }
  }

  const beginX = Math.round(offset * scale)
  const endX = Math.round((length - offset) * scale)
  drawFullHeightRect(ctx, beginX, endX, "#ccc")

  drawWave(ctx, samples, max, beginSample, length, scale)
  drawText(ctx, text, endX - beginX)
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  samples: Float32Array,
  max: number,
  beginSample: number,
  length: number,
  scale: number,
) {
  const { width, height } = ctx.canvas
  ctx.beginPath()
  ctx.moveTo(0, height)
  let prevX = 0
  let maxVal = 0
  for (let i = 0; i < length; i++) {
    const x = Math.round(i * scale)
    if (x > prevX) {
      const y = (maxVal * height) / max
      ctx.lineTo(prevX, height - y)
      prevX = x
      maxVal = 0
    }
    const value = Math.abs(samples[i + beginSample] ?? 0)
    if (value > maxVal) maxVal = value
  }
  ctx.lineTo(width, height)
  ctx.fillStyle = "#000"
  ctx.fill()
}

function drawFullHeightRect(ctx: CanvasRenderingContext2D, begin: number, end: number, color: string) {
  const { height } = ctx.canvas
  ctx.beginPath()
  ctx.rect(begin, 0, end - begin, height)
  ctx.fillStyle = color
  ctx.fill()
}

function drawText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const { width, height } = ctx.canvas
  ctx.font = "24px Noto Serif JP"
  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
  ctx.lineWidth = 5
  ctx.strokeStyle = "#fff"
  ctx.strokeText(text, width / 2, height / 2, maxWidth)
  ctx.fillStyle = "#00f"
  ctx.fillText(text, width / 2, height / 2, maxWidth)
}

function createMergeButtons(
  parElems: ParElems,
  isVerticalWritingMode: boolean,
): [SlIconButton | null, SlIconButton | null] {
  let prevMergeButton: SlIconButton | null = null
  if (parElems.prev && parElems.selected.previousElementSibling === parElems.prev) {
    prevMergeButton = new SlIconButton()
    prevMergeButton.id = "prev-merge-button"
    prevMergeButton.name = isVerticalWritingMode ? "arrows-collapse" : "arrows-collapse-vertical"
    prevMergeButton.label = "Merge with previous media overlay"
    parElems.selected.insertAdjacentElement("beforebegin", prevMergeButton)
  }
  let nextMergeButton: SlIconButton | null = null
  if (parElems.next && parElems.selected.nextElementSibling === parElems.next) {
    nextMergeButton = new SlIconButton()
    nextMergeButton.id = "next-merge-button"
    nextMergeButton.name = isVerticalWritingMode ? "arrows-collapse" : "arrows-collapse-vertical"
    nextMergeButton.label = "Merge with next media overlay"
    parElems.selected.insertAdjacentElement("afterend", nextMergeButton)
  }
  return [prevMergeButton, nextMergeButton]
}

async function callEndpoint(
  payload: ModifyPayload | MergePayload | SplitPayload | HistoryPayload,
  csrftoken: string,
): Promise<Response> {
  return fetch(window.location.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/html",
      "X-CSRFToken": csrftoken,
    },
    mode: "same-origin",
    body: JSON.stringify(payload),
  })
}

function removeRuby(elem: Element): string {
  const textParts: string[] = []
  for (const childNode of elem.childNodes) {
    if (childNode.nodeType == Node.TEXT_NODE && childNode.textContent) {
      textParts.push(childNode.nodeValue ?? "")
    } else if (childNode.nodeType == Node.ELEMENT_NODE && !["RP", "RT"].includes(childNode.nodeName)) {
      textParts.push(removeRuby(childNode as Element))
    }
  }
  return textParts.join("")
}

// @license-end
