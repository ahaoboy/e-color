import { expect, test } from "vitest"
import { Bgra, COLORS, Rgb, Rgba } from "../src"
import { AssColor } from "../src/ass-color"

test("base test", () => {
  const c1 = new Rgb(COLORS.White)
  expect(c1.toHex()).toEqual("FFFFFF")
  const c2 = c1.invert().toHex()
  expect(c2).toEqual("000000")
  expect(new Rgb("FFFFFF").toBgr().toHex()).toEqual("FFFFFF")
})

test("static colors test", () => {
  expect(Rgb.colors.Red.toHex()).equal("FF0000")
  expect(Rgba.colors.Red.toHex()).equal("FF0000FF")
  expect(Bgra.colors.Red.toHex()).equal("0000FFFF")
})

test("rgba color test", () => {
  expect(Rgba.colors.Red.toHex()).equal("FF0000FF")
  expect(Rgba.colors.Red.invert(true).toHex()).equal("00FFFF00")
  expect(Rgba.colors.Red.invert(false).toHex()).equal("00FFFFFF")
})

test("bgra color test", () => {
  expect(Bgra.colors.Red.toHex()).equal("0000FFFF")
  expect(Bgra.colors.Red.invert(true).toHex()).equal("FFFF0000")
  expect(Bgra.colors.Red.invert(false).toHex()).equal("FFFF00FF")
})

test("ass color test", () => {
  expect(AssColor.colors.Red.toHex()).equal("0000FF00")
  expect(AssColor.colors.Red.toRgba().toHex()).equal("FF0000FF")
  expect(AssColor.colors.Red.toRgba().invert().toHex()).equal("00FFFFFF")
  expect(
    AssColor.fromRgba(AssColor.colors.Red.toRgba().invert()).toHex(),
  ).equal("FFFF0000")
  expect(AssColor.colors.Red.invert(true).toHex()).equal("FFFF00FF")
  expect(AssColor.colors.Red.invert(false).toHex()).equal("FFFF0000")
})
