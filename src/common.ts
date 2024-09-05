import { Rgba } from "./color"
import { COLORS, ColorName } from "./const"

export function parseHex(hex: string) {
  if (hex[0] === "#") {
    return Number.parseInt(hex.slice(1), 16)
  }
  return Number.parseInt(hex, 16)
}

// 0x01234567
export const Mask01 = 0xff000000
export const Mask23 = 0x00ff0000
export const Mask45 = 0x0000ff00
export const Mask67 = 0x000000ff

export function get01(n: number): number {
  return (n >> 24) & 0xff
}
export function get23(n: number): number {
  return (n >> 16) & 0xff
}
export function get45(n: number): number {
  return (n >> 8) & 0xff
}
export function get67(n: number): number {
  return n & 0xff
}

export function set01(n: number, v: number): number {
  return (n & 0x00ffffff) | (v << 24)
}
export function set23(n: number, v: number): number {
  return (n & 0xff00ffff) | (v << 16)
}
export function set45(n: number, v: number): number {
  return (n & 0xffff00ff) | (v << 8)
}
export function set67(n: number, v: number): number {
  return (n & 0xffffff00) | v
}

export function toU32(n: number) {
  return n >>> 0
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

export class Color {
  color = 0
  byteCount = 6

  constructor(colorHex: string | number) {
    this.color = typeof colorHex === "number" ? colorHex : parseHex(colorHex)
  }

  toRgba(): Rgba {
    throw new Error("todo")
  }

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
    const hex = (this.color >>> 0).toString(16).padStart(this.byteCount, "0")
    return (prefix + hex).toUpperCase()
  }
}
