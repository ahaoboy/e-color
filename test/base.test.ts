import { expect, test } from "vitest"
import { Argb, Bgr, Bgra, COLORS, Rgb, Rgba } from "../src"

test("rgba", () => {
  const c1 = new Rgba("11223344")
  expect(c1.red).toEqual(0x11)
  expect(c1.green).toEqual(0x22)
  expect(c1.blue).toEqual(0x33)
  expect(c1.alpha).toEqual(0x44)
  expect(c1.toHex()).toEqual("11223344")
  const c2 = c1.invert()
  expect(c2.red).toEqual(0xee)
  expect(c2.green).toEqual(0xdd)
  expect(c2.blue).toEqual(0xcc)
  expect(c2.alpha).toEqual(0x44)
  expect(c2.toHex()).toEqual("EEDDCC44")
  const c3 = c1.invert(true)
  expect(c3.red).toEqual(0xee)
  expect(c3.green).toEqual(0xdd)
  expect(c3.blue).toEqual(0xcc)
  expect(c3.alpha).toEqual(0xbb)
  expect(c3.toHex()).toEqual("EEDDCCBB")
})

test("base test", () => {
  const c1 = new Rgb(COLORS.White)
  expect(c1.toHex()).toEqual("FFFFFF")
  const c2 = c1.invert().toHex()
  expect(c2).toEqual("000000")
  expect(new Rgb("FFFFFF").toBgr().toHex()).toEqual("FFFFFF")
  expect(new Rgb("#11AA33").toBgr().toHex("#")).toEqual("#33AA11")
})

test("rgba invert", () => {
  const c1 = new Rgba("11223344", true)
  expect(c1.toHex()).toEqual("11223344")
  const c2 = c1.invert()
  expect(c2.toHex()).toEqual("EEDDCCBB")
})

test("COLORS", () => {
  const c1 = new Rgb(COLORS.Red).toHex()
  expect(c1).toEqual("FF0000")
})

test("set color test", () => {
  {
    const r = new Rgba(0)
    r.red = 1
    r.green = 2
    r.blue = 3
    r.alpha = 4
    expect(r.toHex()).toEqual("01020304")
  }

  {
    const r = new Bgra(0)
    r.red = 1
    r.green = 2
    r.blue = 3
    r.alpha = 4
    expect(r.toHex()).toEqual("03020104")
  }
})

test("argb", () => {
  const c1 = new Argb("#11223344", true)
  expect(c1.alpha).toEqual(0xee)
  expect(c1.red).toEqual(0x22)
  expect(c1.green).toEqual(0x33)
  expect(c1.blue).toEqual(0x44)

  expect(c1.toHex()).toEqual("11223344")
  const c2 = c1.toRgba()
  expect(c2.toHex()).toEqual("223344EE")
  const c3 = c1.toBgra()
  expect(c3.toHex()).toEqual("443322EE")
  const c4 = new Argb("#FFFF0000", true).toBgra().toHex("#")
  expect(c4).toEqual("#0000FF00")
})

test("Bgr", () => {
  const c1 = new Bgr(0)
  c1.blue = 1
  c1.green = 2
  c1.red = 3
  expect(c1.toHex()).toEqual("1020300")
})
