import { ColorFormat } from "."
import {
  bgraToRgba,
  invertBGRAColor,
  invertRGBAColor,
  rgbaToBgra,
} from "./common"

export class Color {
  private color = 0
  private format: ColorFormat = "rgb"

  private constructor(color: number | number = 0, format: ColorFormat = "rgb") {
    this.color = typeof color === "number" ? color : parseInt(color, 16)
    this.format = format
  }
  static fromRgba(rgba: string | number) {
    const c = typeof rgba === "number" ? rgba : parseInt(rgba, 16)
    return new Color(c, "rgba")
  }

  static fromBgra(bgra: string | number) {
    const c = typeof bgra === "number" ? bgra : parseInt(bgra, 16)
    return new Color(c, "bgra")
  }
  static fromRgb(rgba: string | number) {
    const c = typeof rgba === "number" ? rgba : parseInt(rgba, 16)
    return new Color(c, "rgb")
  }

  static fromBgr(bgra: string | number) {
    const c = typeof bgra === "number" ? bgra : parseInt(bgra, 16)
    return new Color(c, "bgr")
  }
  toRgba() {
    if (this.format === "rgba") {
      return this
    }
    this.color = bgraToRgba(this.color)
    this.format = "rgba"
    return this
  }

  toBgra() {
    if (this.format === "bgra") {
      return this
    }
    this.color = rgbaToBgra(this.color)
    this.format = "bgra"
    return this
  }

  invert() {
    this.color =
      this.format === "bgra"
        ? invertBGRAColor(this.color)
        : invertRGBAColor(this.color)
    return this
  }
  hasAlpha() {
    return this.format === "rgba" || this.format === "bgra"
  }
  toHex(prefix = "") {
    const hex = this.color.toString(16).padStart(6, "0")
    return prefix + (this.hasAlpha() ? hex.padEnd(8, "0") : hex)
  }
}
