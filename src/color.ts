import { Color, createColors, toU8, toU32 } from "./common"
import { COLORS, ColorName } from "./const"

export class Rgba extends Color {
  protected bitCount = 8
  toRgba(): Rgba {
    return new Rgba(this.color)
  }
  fromRgba(rgba: Rgba): Rgba {
    return new Rgba(rgba.color)
  }
  static colors = createColors(Rgba.fromName)

  static fromName(name: ColorName) {
    return new Rgba(`${COLORS[name]}FF`)
  }

  get red() {
    return toU8((this.color >> 24) & 0xff)
  }
  get green() {
    return toU8((this.color >> 16) & 0xff)
  }
  get blue() {
    return toU8((this.color >> 8) & 0xff)
  }

  get alpha() {
    return toU8(this.color & 0xff)
  }
  invert(alpha = false) {
    const c = toU32(
      ((255 - this.red) << 24) +
        ((255 - this.green) << 16) +
        ((255 - this.blue) << 8) +
        (alpha ? 255 - this.alpha : this.alpha),
    )
    return new Rgba(c)
  }
  toRgb() {
    return Rgb.fromRgba(this)
  }
  toBgr() {
    return Bgr.fromRgba(this)
  }
  toBgra() {
    return Bgra.fromRgba(this)
  }
}

export class Rgb extends Color {
  protected bitCount = 6
  static red: any
  static colors = createColors(Rgb.fromName)

  get red() {
    return toU8((this.color >> 16) & 0xff)
  }
  get green() {
    return toU8((this.color >> 8) & 0xff)
  }
  get blue() {
    return toU8(this.color & 0xff)
  }
  static fromRgba(rgba: Rgba): Rgb {
    const c = toU32((rgba.red << 16) + (rgba.green << 8) + rgba.blue)
    return new Rgb(c)
  }

  static fromName(name: ColorName): Rgb {
    return new Rgb(COLORS[name])
  }

  toRgba() {
    const c = toU32(
      (this.red << 24) + (this.green << 16) + (this.blue << 8) + 255,
    )
    return new Rgba(c)
  }

  invert(alpha = false) {
    return Rgb.fromRgba(this.toRgba().invert(alpha))
  }
}

export class Bgr extends Color {
  protected bitCount = 6
  get blue() {
    return toU8((this.color >> 16) & 0xff)
  }
  get green() {
    return toU8((this.color >> 8) & 0xff)
  }
  get red() {
    return toU8(this.color & 0xff)
  }
  static colors = createColors(Bgr.fromName)

  static fromRgba(rgba: Rgba): Bgr {
    const c = toU32((rgba.blue << 16) + (rgba.green << 8) + rgba.red)
    return new Bgr(c)
  }
  static fromName(name: ColorName): Bgr {
    return Bgr.fromRgba(Rgba.fromName(name))
  }
  toRgba() {
    const c = toU32(
      (this.blue << 24) + (this.green << 16) + (this.red << 8) + 255,
    )
    return new Rgba(c)
  }

  invert(alpha = false) {
    return Bgr.fromRgba(this.toRgba().invert(alpha))
  }
}
export class Bgra extends Color {
  protected bitCount = 8
  static colors = createColors(Bgra.fromName)
  get blue() {
    return toU8((this.color >> 24) & 0xff)
  }
  get green() {
    return toU8((this.color >> 16) & 0xff)
  }
  get red() {
    return toU8((this.color >> 8) & 0xff)
  }

  get alpha() {
    return toU8(this.color & 0xff)
  }

  static fromRgba(rgba: Rgba): Bgra {
    const c = toU32(
      (rgba.blue << 24) + (rgba.green << 16) + (rgba.red << 8) + rgba.alpha,
    )
    return new Bgra(c)
  }
  static fromName(name: ColorName): Bgra {
    return Bgra.fromRgba(Rgba.fromName(name))
  }
  toRgba() {
    const c = toU32(
      (this.red << 24) + (this.green << 16) + (this.blue << 8) + this.alpha,
    )
    return new Rgba(c)
  }
  invert(alpha = false) {
    return Bgra.fromRgba(this.toRgba().invert(alpha))
  }
}
