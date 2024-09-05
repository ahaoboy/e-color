import { alpha as colorBitsAlpha } from "color-bits/string"
import { colord } from "colord"
import { bench, describe } from "vitest"
import { Rgba } from "../src"
import { parseHex, set67, toU32 } from "../src/common"

const Color = "#808080"
describe("color", async () => {
  bench("color-bits", () => {
    let N = 1 << 20
    while (N--) colorBitsAlpha(Color, 0.5)
  })

  bench("e-color fp", () => {
    let N = 1 << 20
    while (N--) set67(parseHex(Color), 100)
  })

  bench("e-color oo", () => {
    let N = 1 << 20
    while (N--) new Rgba(Color).setAlpha(100)
  })
  bench("e-color", () => {
    let N = 1 << 20
    while (N--) new Rgba(Color).setAlpha(100)
  })

  bench("colord", () => {
    let N = 1 << 20
    while (N--) colord(Color).alpha(0.5)
  })
})
