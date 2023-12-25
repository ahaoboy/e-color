import { ColorFormat } from "."
import {
  bgrToRgb,
  bgraToRgba,
  invertBGRAColor,
  invertRGBAColor,
  leftShift,
  rgbToBgr,
  rgbaToBgra,
  rightShift,
} from "./common"

export class Color {
  private color = 0
  private format: ColorFormat = "rgb"

  private constructor(color: number | string = 0, format: ColorFormat = "rgb") {
    this.color = typeof color === "number" ? color : parseInt(color, 16)
    this.format = format
  }
  static fromRgba(rgba: string | number) {
    return new Color(rgba, "rgba")
  }

  static fromBgra(bgra: string | number) {
    return new Color(bgra, "bgra")
  }
  static fromRgb(rgb: string | number) {
    return new Color(rgb, "rgb")
  }

  static fromBgr(bgr: string | number) {
    return new Color(bgr, "bgr")
  }
  toRgba() {
    switch (this.format) {
      case "rgba": {
        return this
      } case "bgra": {
        this.color = bgraToRgba(this.color)
        this.format = "rgba"
        return this
      } case "rgb": {
        this.color = leftShift(this.color, 8)
        this.format = "rgba"
        return this
      } case "bgr": {
        this.color = bgraToRgba(leftShift(this.color, 8))
        this.format = "rgba"
        return this
      }
    }

  }

  toBgra() {
    switch (this.format) {
      case "bgra": {
        return this
      } case "rgba": {
        this.color = rgbaToBgra(this.color)
        this.format = "bgra"
        return this
      } case "rgb": {
        this.color = rgbaToBgra(leftShift(this.color, 8))
        this.format = "bgra"
        return this
      } case "bgr": {
        this.color = leftShift(this.color, 8)
        this.format = "bgra"
        return this
      }
    }
  }

  toRgb() {
    switch (this.format) {
      case "rgb": {
        return this
      } case "rgba": {
        this.color = rightShift(this.color, 8)
        this.format = "rgb"
        return this
      } case "bgra": {
        this.color = bgrToRgb(rightShift(this.color, 8))
        this.format = "rgb"
        return this
      } case "bgr": {
        this.color = bgrToRgb(this.color)
        this.format = "rgb"
        return this
      }
    }
  }

  toBgr() {
    switch (this.format) {
      case "bgr": {
        return this
      } case "bgra": {
        this.color = this.color >> 8
        this.format = "bgr"
        return this
      } case "rgba": {
        this.color = rgbToBgr(this.color >> 8)
        this.format = "bgr"
        return this
      } case "rgb": {
        this.color = rgbToBgr(this.color)
        this.format = "bgr"
        return this
      }
    }
  }
  clone() {
    return new Color(this.color, this.format)
  }
  invert() {
    switch (this.format) {
      case "bgra": {
        this.color = invertBGRAColor(this.color)
        return this
      } case "bgr": {
        this.color = rightShift(invertBGRAColor(leftShift(this.color, 8)), 8)
        return this
      } case "rgb": {
        this.color = rightShift(invertRGBAColor(leftShift(this.color, 8)), 8)
        return this
      } case "rgba": {
        this.color = invertRGBAColor(this.color)
        return this
      }
    }
  }
  hasAlpha() {
    return this.format === "rgba" || this.format === "bgra"
  }
  toHex(prefix = "") {
    const hex = this.color.toString(16).padStart(6, "0")
    return prefix + (this.hasAlpha() ? hex.padEnd(8, "0") : hex)
  }
}
