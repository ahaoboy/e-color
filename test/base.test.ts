import { expect, test } from "vitest"
import { COLORS, Rgb } from "../src"

test("base test", () => {
  const c1 = new Rgb(COLORS.White)
  expect(c1.toHex().toLowerCase()).toEqual("ffffff")
  const c2 = c1.invert().toHex()
  expect(c2).toEqual("000000")
  expect(new Rgb("FFFFFF").toBgr().toHex()).toEqual("ffffff")

  // const rgba = new Rgb("FFFFFF").toRgba()
  // console.log("rgba", rgba.color)
  // console.log("rgba", rgba.alpha, rgba.red, rgba.blue, rgba.green)

  // const rgb = new Rgb("FFFFFF").toRgba().toBgr()
  // console.log(rgb.red, rgb.blue, rgb.green)
})
