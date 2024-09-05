import { expect, test } from "vitest"
import { get01, set01 } from "../src/common"

test("parse test", () => {
  expect(get01(0xffffffff)).toEqual(0xff)
  expect(set01(0xffffffff, 0x01)).toEqual(0x01ffffff)
})
