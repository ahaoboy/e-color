function toU8(n: number) {
  return n < 0 ? n + 0xff : n
}

function toU32(n: number) {
  return n < 0 ? n + 0xffffffff + 1 : n
}

abstract class Color<T> {
  protected color: number
  protected bitCount = 6
  constructor(colorHex: string | number) {
    this.color =
      typeof colorHex === "number" ? colorHex : parseInt(colorHex, 16)
  }
  abstract toRgba(): Rgba
  abstract fromRgba(rgba: Rgba): T

  toBgr() {
    return this.toRgba().toBgr()
  }
  toBgra() {
    return this.toRgba().toBgra()
  }
  toRgb() {
    return this.toRgba().toRgb()
  }
  toHex(prefix = "") {
    const hex = this.color.toString(16).padStart(this.bitCount, "0")
    return prefix + hex
  }
  invert(): T {
    return this.fromRgba(this.toRgba().invert())
  }
}
export class Rgb extends Color<Rgb> {
  protected bitCount = 6
  get red() {
    return toU8((this.color >> 16) & 0xff)
  }
  get green() {
    return toU8((this.color >> 8) & 0xff)
  }
  get blue() {
    return toU8(this.color & 0xff)
  }
  fromRgba(rgba: Rgba) {
    const c = toU32((rgba.red << 16) + (rgba.green << 8) + rgba.blue)
    return new Rgb(c)
  }
  toRgba() {
    const c = toU32(
      (this.red << 24) + (this.green << 16) + (this.blue << 8) + 255,
    )
    return new Rgba(c)
  }
}

export class Rgba extends Color<Rgba> {
  protected bitCount = 8
  toRgba(): Rgba {
    return new Rgba(this.color)
  }
  fromRgba(rgba: Rgba): Rgba {
    return new Rgba(rgba.color)
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
  invert() {
    const c = toU32(
      ((255 - this.red) << 24) +
        ((255 - this.green) << 16) +
        ((255 - this.blue) << 8) +
        this.alpha,
    )
    return new Rgba(c)
  }
  toRgb() {
    return new Rgb(0).fromRgba(this)
  }
  toBgr() {
    return new Bgr(0).fromRgba(this)
  }
  toBgra() {
    return new Bgra(0).fromRgba(this)
  }
}

export class Bgr extends Color<Bgr> {
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

  fromRgba(rgba: Rgba) {
    const c = toU32((rgba.blue << 16) + (rgba.green << 8) + rgba.red)
    return new Bgr(c)
  }

  toRgba() {
    const c = toU32(
      (this.blue << 24) + (this.green << 16) + (this.red << 8) + 255,
    )
    return new Rgba(c)
  }
}
export class Bgra extends Color<Bgra> {
  protected bitCount = 8
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

  fromRgba(rgba: Rgba) {
    const c = toU32(
      (rgba.blue << 24) + (rgba.green << 16) + (rgba.red << 8) + rgba.alpha,
    )
    return new Bgra(c)
  }

  toRgba() {
    const c = toU32(
      (this.red << 24) + (this.green << 16) + (this.blue << 8) + this.alpha,
    )
    return new Rgba(c)
  }
}
