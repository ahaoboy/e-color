import { Color, createColors, toU8, toU32 } from "./common"
import { COLORS, ColorName } from "./const"

export class Rgba extends Color {
  protected bitCount = 8
  constructor(colorHex: string | number) {
    super(colorHex)
    this.color =
      typeof colorHex === "number" ? colorHex : parseInt(colorHex, 16)
  }
  toRgba(): Rgba {
    return new Rgba(this.color)
  }
  fromRgba(rgba: Rgba): Rgba {
    return new Rgba(rgba.color)
  }
  static Colors = createColors(Rgba.fromName)

  static fromName(name: ColorName) {
    return new Rgba(COLORS[name] * (1 << 8) + 255)
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

  set red(n: number) {
    this.color = toU32((this.color & 0x00ffffff) | toU32(n << 24))
  }
  set green(n: number) {
    this.color = toU32((this.color & 0xff00ffff) | toU32(n << 16))
  }
  set blue(n: number) {
    this.color = toU32((this.color & 0xffff00ff) | toU32(n << 8))
  }
  set alpha(n: number) {
    this.color = toU32((this.color & 0xffffff00) | toU32(n << 0))
  }

  setRed(n: number) {
    this.red = n
    return this
  }
  setGreen(n: number) {
    this.green = n
    return this
  }
  setBlue(n: number) {
    this.blue = n
    return this
  }
  setAlpha(n: number) {
    this.alpha = n
    return this
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
  constructor(colorHex: string | number) {
    super(colorHex)
    this.color =
      typeof colorHex === "number" ? colorHex : parseInt(colorHex, 16)
  }

  static Colors = createColors(Rgb.fromName)

  get red() {
    return toU8((this.color >> 16) & 0xff)
  }
  get green() {
    return toU8((this.color >> 8) & 0xff)
  }
  get blue() {
    return toU8(this.color & 0xff)
  }

  set red(n: number) {
    this.color = toU32((this.color & 0x00ffff) | toU32(n << 16))
  }
  set green(n: number) {
    this.color = toU32((this.color & 0xff00ff) | toU32(n << 8))
  }
  set blue(n: number) {
    this.color = toU32((this.color & 0xffff00) | toU32(n << 0))
  }

  setRed(n: number) {
    this.red = n
    return this
  }
  setGreen(n: number) {
    this.green = n
    return this
  }
  setBlue(n: number) {
    this.blue = n
    return this
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
  constructor(colorHex: string | number) {
    super(colorHex)
    this.color =
      typeof colorHex === "number" ? colorHex : parseInt(colorHex, 16)
  }
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

  set blue(n: number) {
    this.color = toU32((this.color & 0x00ffff) | toU32(n << 16))
  }
  set green(n: number) {
    this.color = toU32((this.color & 0xff00ff) | toU32(n << 8))
  }
  set red(n: number) {
    this.color = toU32((this.color & 0xffff00) | toU32(n << 0))
  }
  setRed(n: number) {
    this.red = n
    return this
  }
  setGreen(n: number) {
    this.green = n
    return this
  }
  setBlue(n: number) {
    this.blue = n
    return this
  }
  static Colors = createColors(Bgr.fromName)

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
  static Colors = createColors(Bgra.fromName)
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
  set blue(n: number) {
    this.color = toU32((this.color & 0x00ffffff) | toU32(n << 24))
  }
  set green(n: number) {
    this.color = toU32((this.color & 0xff00ffff) | toU32(n << 16))
  }
  set red(n: number) {
    this.color = toU32((this.color & 0xffff00ff) | toU32(n << 8))
  }
  set alpha(n: number) {
    this.color = toU32((this.color & 0xffffff00) | toU32(n << 0))
  }

  setRed(n: number) {
    this.red = n
    return this
  }
  setGreen(n: number) {
    this.green = n
    return this
  }
  setBlue(n: number) {
    this.blue = n
    return this
  }
  setAlpha(n: number) {
    this.alpha = n
    return this
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
