import { Rgba } from "./color"
import { COLORS, ColorName } from "./const"

export function toU8(n: number) {
  return n < 0 ? n + 0xff : n
}

export function toU32(n: number) {
  return n < 0 ? n + 0xffffffff + 1 : n
}

export function createColors<T>(
  fn: (name: ColorName) => T,
): Record<ColorName, T> {
  const Colors = {} as Record<ColorName, T>
  for (const name of Object.keys(COLORS) as ColorName[]) {
    Colors[name] = fn(name)
  }
  return Colors
}

export abstract class Color {
  protected color: number
  protected bitCount = 6

  constructor(colorHex: string | number) {
    this.color =
      typeof colorHex === "number" ? colorHex : parseInt(colorHex, 16)
  }
  abstract toRgba(): Rgba

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
    return (prefix + hex).toUpperCase()
  }
}
