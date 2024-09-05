import {
  Color,
  createColors,
  get01,
  get23,
  get45,
  get67,
  set01,
  set23,
  set45,
  set67,
} from "./common"
import { COLORS, ColorName } from "./const"

export class Rgba extends Color {
  byteCount = 8

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
    return get01(this.color)
  }
  get green() {
    return get23(this.color)
  }
  get blue() {
    return get45(this.color)
  }
  get alpha() {
    return get67(this.color)
  }

  set red(n: number) {
    this.color = set01(this.color, n)
  }
  set green(n: number) {
    this.color = set23(this.color, n)
  }
  set blue(n: number) {
    this.color = set45(this.color, n)
  }
  set alpha(n: number) {
    this.color = set67(this.color, n)
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
    const c = alpha ? ~this.color : (~this.color & 0xffffff00) | this.alpha
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
  byteCount = 6

  static Colors = createColors(Rgb.fromName)
  get red() {
    return get23(this.color)
  }
  get green() {
    return get45(this.color)
  }
  get blue() {
    return get67(this.color)
  }

  set red(n: number) {
    this.color = set23(this.color, n)
  }
  set green(n: number) {
    this.color = set45(this.color, n)
  }
  set blue(n: number) {
    this.color = set67(this.color, n)
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
    const c = rgba.color >>> 8
    return new Rgb(c)
  }

  static fromName(name: ColorName): Rgb {
    return new Rgb(COLORS[name])
  }

  toRgba() {
    const c = (this.color << 8) | 0xff
    return new Rgba(c)
  }

  invert() {
    const c = ~this.color & 0x00ffffff
    return new Rgb(c)
  }
}

export class Bgr extends Color {
  byteCount = 6

  get blue() {
    return get23(this.color)
  }
  get green() {
    return get45(this.color)
  }
  get red() {
    return get67(this.color)
  }

  set blue(n: number) {
    this.color = set23(this.color, n)
  }
  set green(n: number) {
    this.color = set45(this.color, n)
  }
  set red(n: number) {
    this.color = set67(this.color, n)
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
    const c = (rgba.blue << 16) | (rgba.green << 8) | rgba.red
    return new Bgr(c)
  }
  static fromName(name: ColorName): Bgr {
    return Bgr.fromRgba(Rgba.fromName(name))
  }
  toRgba() {
    const c = (this.blue << 24) | (this.green << 16) | (this.red << 8) | 0xff
    return new Rgba(c)
  }

  invert() {
    const c = ~this.color & 0x00ffffff
    return new Bgr(c)
  }
}
export class Bgra extends Color {
  byteCount = 8

  static Colors = createColors(Bgra.fromName)
  get blue() {
    return get01(this.color)
  }
  get green() {
    return get23(this.color)
  }
  get red() {
    return get45(this.color)
  }

  get alpha() {
    return get67(this.color)
  }
  set blue(n: number) {
    this.color = set01(this.color, n)
  }
  set green(n: number) {
    this.color = set23(this.color, n)
  }
  set red(n: number) {
    this.color = set45(this.color, n)
  }
  set alpha(n: number) {
    this.color = set67(this.color, n)
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
    const c =
      ((rgba.blue << 24) + (rgba.green << 16) + (rgba.red << 8)) | rgba.alpha
    return new Bgra(c)
  }
  static fromName(name: ColorName): Bgra {
    return Bgra.fromRgba(Rgba.fromName(name))
  }
  toRgba() {
    const c =
      ((this.red << 24) |
        (this.green << 16) |
        (this.blue << 8) |
        this.alpha) >>>
      0
    return new Rgba(c)
  }
  invert(alpha = false) {
    const c = alpha ? ~this.color : (~this.color & 0xffffff00) | this.alpha
    return new Bgra(c)
  }
}
