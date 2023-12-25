import { ColorFormat } from "."
export function leftShift(number: number, bits: number): number {
  return number * Math.pow(2, bits);
}
export function rightShift(number: number, bits: number): number {
  const sign: number = number < 0 ? -1 : 1;
  const absolute: number = Math.abs(number);
  return sign * Math.floor(absolute / Math.pow(2, bits));
}

export function rgbaToBgra(rgba: number): number {
  const red = rightShift(rgba, 24) & 0xff
  const green = rightShift(rgba, 16) & 0xff
  const blue = rightShift(rgba, 8) & 0xff
  const alpha = rgba & 0xff

  return leftShift(blue, 24) + leftShift(green, 16) + leftShift(red, 8) + alpha
}

export function rgbToBgr(rgb: number): number {
  const red = rightShift(rgb, 16) & 0xff
  const green = rightShift(rgb, 8) & 0xff
  const blue = rgb & 0xff

  return leftShift(blue, 16) + leftShift(green, 8) + red
}

export function bgraToRgba(bgra: number): number {
  const blue = rightShift(bgra, 24) & 0xff
  const green = rightShift(bgra, 16) & 0xff
  const red = rightShift(bgra, 8) & 0xff
  const alpha = bgra & 0xff

  return leftShift(red, 24) + leftShift(green, 16) + leftShift(blue, 8) + alpha
}

export function bgrToRgb(bgr: number): number {
  const blue = rightShift(bgr, 16) & 0xff
  const green = rightShift(bgr, 8) & 0xff
  const red = bgr & 0xff

  return leftShift(red, 16) + leftShift(green, 8) + blue
}

export function invertRGBAColor(rgba: number): number {
  const red = rightShift(rgba, 24) & 0xff
  const green = rightShift(rgba, 16) & 0xff
  const blue = rightShift(rgba, 8) & 0xff
  const alpha = rgba & 0xff
  return (
    leftShift((255 - red), 24) + leftShift((255 - green), 16) + leftShift((255 - blue), 8) + alpha
  )
}
export function invertBGRAColor(bgra: number): number {
  const blue = rightShift(bgra, 24) & 0xff
  const green = rightShift(bgra, 16) & 0xff
  const red = rightShift(bgra, 8) & 0xff
  const alpha = bgra & 0xff
  return (
    leftShift((255 - blue), 24) + leftShift((255 - green), 16) + leftShift((255 - red), 8) + alpha
  )
}

export function hasAlpha(format: ColorFormat) {
  return format === "rgba" || format === "bgra"
}
