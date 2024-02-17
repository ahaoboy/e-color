import { expect, test } from "vitest"
import { Bgr, Bgra, COLORS, Rgb, Rgba } from "../src"
import { AssColor } from "../src/ass-color"

test("base test", () => {
  const c1 = new Rgb(COLORS.White)
  expect(c1.toHex()).toEqual("FFFFFF")
  const c2 = c1.invert().toHex()
  expect(c2).toEqual("000000")
  expect(new Rgb("FFFFFF").toBgr().toHex()).toEqual("FFFFFF")
})

test("fromName", () => {
  const c1 = Bgr.fromName("AliceBlue").toHex()
  expect(c1).toEqual("FFF8F0")
})

test("static Colors test", () => {
  expect(Rgb.Colors.Red.toHex()).equal("FF0000")
  expect(Rgba.Colors.Red.toHex()).equal("FF0000FF")
  expect(Bgra.Colors.Red.toHex()).equal("0000FFFF")
})

test("rgba color test", () => {
  expect(Rgba.Colors.Red.toHex()).equal("FF0000FF")
  expect(Rgba.Colors.Red.invert(true).toHex()).equal("00FFFF00")
  expect(Rgba.Colors.Red.invert(false).toHex()).equal("00FFFFFF")
})

test("bgra color test", () => {
  expect(Bgra.Colors.Red.toHex()).equal("0000FFFF")
  expect(Bgra.Colors.Red.invert(true).toHex()).equal("FFFF0000")
  expect(Bgra.Colors.Red.invert(false).toHex()).equal("FFFF00FF")
})

test("ass color test", () => {
  expect(AssColor.Colors.Red.toHex()).equal("0000FF00")
  expect(AssColor.Colors.Red.toRgba().toHex()).equal("FF0000FF")
  expect(AssColor.Colors.Red.toRgba().invert().toHex()).equal("00FFFFFF")
  expect(
    AssColor.fromRgba(AssColor.Colors.Red.toRgba().invert()).toHex(),
  ).equal("FFFF0000")
  expect(AssColor.Colors.Red.invert(true).toHex()).equal("FFFF00FF")
  expect(AssColor.Colors.Red.invert(false).toHex()).equal("FFFF0000")
})

test("set color test", () => {
  {
    const r = Rgba.Colors.White
    r.red = 1
    r.green = 2
    r.blue = 3
    r.alpha = 4
    expect(r.toHex()).toEqual("01020304")
  }

  {
    const r = Bgra.Colors.White
    r.red = 1
    r.green = 2
    r.blue = 3
    r.alpha = 4
    expect(r.toHex()).toEqual("03020104")
  }
})
