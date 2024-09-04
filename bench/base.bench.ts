import { alpha as colorBitsAlpha } from "color-bits/string"
import { colord } from "colord"
import { bench, describe } from "vitest"
import { Rgba } from "../src"

const Color = "#808080"
describe("color", async () => {
  bench("color-bits", () => {
    colorBitsAlpha(Color, 0.5)
  })

  bench("e-color", () => {
    new Rgba(Color).setAlpha(0.5).toHex()
  })

  bench("colord", () => {
    colord(Color).alpha(0.5).toHex()
  })
})
