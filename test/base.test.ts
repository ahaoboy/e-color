import { expect, test } from "vitest"
import { COLORS, Color } from "../src"

test("base test", () => {
  const c1 = Color.fromRgb(COLORS.White)

  expect(c1.toHex().toLowerCase()).toEqual("ffffff")

  const c2 = c1.invert().toHex()
  expect(c2).toEqual("000000")
})
