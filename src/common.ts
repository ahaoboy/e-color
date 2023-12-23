import { ColorFormat } from "."

// RGBA to BGRA conversion
export function rgbaToBgra(rgba: number): number {
  const alpha = (rgba >> 24) & 0xff
  const red = (rgba >> 16) & 0xff
  const green = (rgba >> 8) & 0xff
  const blue = rgba & 0xff

  return (alpha << 24) | (blue << 16) | (green << 8) | red
}

// BGRA to RGBA conversion
export function bgraToRgba(bgra: number): number {
  const alpha = (bgra >> 24) & 0xff
  const blue = (bgra >> 16) & 0xff
  const green = (bgra >> 8) & 0xff
  const red = bgra & 0xff

  return (alpha << 24) | (red << 16) | (green << 8) | blue
}

export function invertRGBAColor(rgba: number): number {
  const alpha = (rgba >> 24) & 0xff
  const red = (rgba >> 16) & 0xff
  const green = (rgba >> 8) & 0xff
  const blue = rgba & 0xff

  return (
    (alpha << 24) | ((255 - red) << 16) | ((255 - green) << 8) | (255 - blue)
  )
}
export function invertBGRAColor(bgra: number): number {
  const alpha = (bgra >> 24) & 0xff
  const blue = (bgra >> 16) & 0xff
  const green = (bgra >> 8) & 0xff
  const red = bgra & 0xff

  return (
    (alpha << 24) | ((255 - blue) << 16) | ((255 - green) << 8) | (255 - red)
  )
}

export function hasAlpha(format: ColorFormat) {
  return format === "rgba" || format === "bgra"
}
