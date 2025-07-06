// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0

import { customElement, property, state } from "lit/decorators.js"
import { css, LitElement } from "lit"
import { SlRange } from "@shoelace-style/shoelace"
import { playBuffer } from "./epub-overlay-edit"

type MaybeInterval = [number, number] | null
type Timing = [number, number]

interface SpanData {
  chars: string[]
  timing?: Timing
}

@customElement("align-threshold")
export class AlignThreshold extends LitElement {
  readonly BEGIN_CHARS = ["「"]
  readonly END_CHARS = ["。"]

  static styles = css`
    p {
      margin-block-end: var(--sl-line-height-denser);
    }
    span {
      margin-right: var(--sl-spacing-x-small);
    }
    span[title] {
      border: 1px solid var(--sl-color-neutral-500);
      cursor: pointer;
    }
    span:hover[title] {
      background-color: var(--sl-color-primary-100);
    }
    .-epub-media-overlay-active {
      background-color: var(--sl-color-primary-100);
    }
  `

  @property({ type: String }) audiosrc?: string
  @property({ type: String }) text?: string
  @property({ type: Number }) initialsilence?: number
  @property({
    converter: (values) => {
      const intervals: MaybeInterval[] = []
      if (values === null) return intervals
      let a: number | null = null
      for (const value of values.split(",")) {
        if (value === "") {
          intervals.push(null)
        } else if (a !== null) {
          intervals.push([a, parseInt(value, 10)])
          a = null
        } else {
          a = parseInt(value, 10)
        }
      }
      return intervals
    },
  })
  intervals?: MaybeInterval[]
  @property({
    converter: (values) => {
      const timings: [number, number][] = []
      if (values === null) return timings
      const numValues = values.split(",").map((value) => parseFloat(value))
      for (let i = 0; i < numValues.length - 1; i += 2) {
        timings.push([numValues[i], numValues[i + 1]])
      }
      return timings
    },
  })
  timings?: Timing[]

  @state()
  _silence = 0

  private audioContext?: AudioContext
  private audioBuffer?: AudioBuffer

  constructor() {
    super()
    const thresholdSlider: SlRange = document.getElementById("threshold") as SlRange
    console.assert(thresholdSlider, 'expected a slider element with id="threshold"')
    thresholdSlider.oninput = () => {
      const threshold = thresholdSlider.value
      this._silence = threshold < 0 ? 0 : threshold
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this._silence = this.initialsilence ?? 0
  }

  /**
   * The top-level list groups data for paragraphs.
   * The next level groups data for span elements.
   */
  private groupIntervals(): SpanData[][] {
    const groups: SpanData[][] = []
    if (!this.intervals || !this.text) return groups
    const textLines = this.text.split("\n")
    const text = textLines.join("") // removes newlines
    const newlinePositions = textLines.reduce<number[]>((acc, cur) => [...acc, (acc.at(-1) ?? 0) + cur.length], [])
    let newlinePositionIndex = 0
    let paragraph: SpanData[] = []
    let textIndex = 0
    // the intervals hold indices for the text (without newlines)
    for (let i = 0; i < this.intervals.length; i++) {
      const interval = this.intervals[i]
      if (interval === null) continue
      const [start, end] = interval

      // Fill all the gaps between intervals by adding these characters to the last data element.
      while (textIndex < start && !this.BEGIN_CHARS.includes(text[textIndex])) {
        fillGapsBetweenIntervals(paragraph, text[textIndex])
        textIndex++
      }

      // A newline in the text attribute implies the start of a new paragraph
      while (start >= newlinePositions[newlinePositionIndex]) {
        groups.push(paragraph)
        paragraph = []
        newlinePositionIndex++
      }

      // Handle the normal case (we are inside the given interval or at the start of a quotation)
      const spanData: SpanData = { chars: [] }
      while (textIndex < end) {
        spanData.chars.push(text[textIndex])
        textIndex++
      }

      // add timings if available
      spanData.timing = this.timings?.at(i)

      // finally, add the final data structure to the paragraph array
      paragraph.push(spanData)
    }
    // Handle punctuation: add to last word
    if (paragraph.length > 0) {
      while (textIndex < text.length) {
        if (this.END_CHARS.includes(text[textIndex])) {
          paragraph.at(-1)!.chars.push(text[textIndex])
          textIndex++
        } else {
          break
        }
      }
    }
    // Handle remaining text
    if (textIndex < text.length) {
      paragraph.push({ chars: [] })
    }
    for (let i = textIndex; i < text.length; i++) {
      paragraph.at(-1)!.chars.push(text[i])
      if (i === newlinePositions[newlinePositionIndex]) {
        groups.push(paragraph)
        paragraph = [{ chars: [] }]
        newlinePositionIndex++
      }
    }
    if (paragraph.length > 0) {
      groups.push(paragraph)
    }
    return groups
  }

  private createHtmlElements(groups: SpanData[][]): HTMLParagraphElement[] {
    const elems = groups.map((paragraph) => {
      const pElem = document.createElement("p")
      const spanElems = paragraph.map((spanData) => {
        const textNode = document.createTextNode(spanData.chars.join(""))
        const spanElem = document.createElement("span")
        spanElem.appendChild(textNode)
        if (spanData.timing) {
          const t = spanData.timing
          spanElem.title = `${t[0].toFixed(1)}-${t[1].toFixed(1)}s`
          spanElem.onclick = null
        }
        return spanElem
      })
      pElem.append(...spanElems)
      return pElem
    })
    void this.initializeAudio(groups, elems)
    return elems
  }

  private mergeBySilence(groups: SpanData[][]): SpanData[][] {
    // make no merges between paragraphs
    return groups.map((paragraph) => {
      const mergedData: SpanData[] = []
      for (const spanData of paragraph) {
        const lastMerged = mergedData.at(-1)
        const lastEnd = lastMerged?.timing?.at(1)
        const currentStart = spanData.timing?.at(0)
        if (
          lastMerged?.timing &&
          spanData.timing &&
          currentStart &&
          lastEnd &&
          currentStart - lastEnd < this._silence
        ) {
          lastMerged.chars.push(...spanData.chars)
          lastMerged.timing = [lastMerged.timing[0], spanData.timing[1]]
        } else {
          mergedData.push(spanData)
        }
      }
      return mergedData
    })
  }

  private async initializeAudio(groups: SpanData[][], elems: HTMLParagraphElement[]): Promise<void> {
    if (!this.audiosrc) return
    if (!this.audioContext) this.audioContext = new AudioContext()
    if (!this.audioBuffer) {
      const audioUrl = new URL(this.audiosrc, window.location.origin)
      const response = await fetch(audioUrl)
      const data = await response.arrayBuffer()
      this.audioBuffer = await this.audioContext.decodeAudioData(data)
    }

    console.assert(groups.length === elems.length)
    for (let i = 0; i < groups.length; i++) {
      const paragraph = groups[i]
      const pElem = elems[i]
      console.assert(paragraph.length === pElem.children.length)
      for (let j = 0; j < paragraph.length; j++) {
        const spanData = paragraph[j]
        const elem = pElem.children[j] as HTMLElement
        elem.onclick = this.createPlayBufferEvent(spanData, elem)
      }
    }
  }

  private createPlayBufferEvent(spanData: SpanData, elem: HTMLElement): () => void {
    return () => {
      if (!spanData.timing) return
      const [start, end] = spanData.timing
      elem.classList.add("-epub-media-overlay-active")
      setTimeout(
        () => {
          elem.classList.remove("-epub-media-overlay-active")
        },
        (end - start) * 1000,
      )
      playBuffer(this.audioContext!, this.audioBuffer!, start, end)
    }
  }

  protected render() {
    if (this.timings && this.intervals) console.assert(this.timings.length === this.intervals.length)
    const groups = this.groupIntervals()
    const mergedGroups = this.mergeBySilence(groups)
    return this.createHtmlElements(mergedGroups)
  }
}

/** Changes the `paragraph` array. */
function fillGapsBetweenIntervals(paragraph: SpanData[], char: string): void {
  const prevSpanData = paragraph.at(-1)
  if (prevSpanData) {
    // if there is a previous data element, add the text here
    prevSpanData.chars.push(char)
  } else {
    // otherwise create a new data element that won't hold speech recognition information (special case)
    const newSpanData: SpanData = { chars: [char] }
    paragraph.push(newSpanData)
  }
}

// @license-end
