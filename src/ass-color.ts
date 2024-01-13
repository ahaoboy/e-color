import { Bgra, ColorName, Rgba } from "."
import { createColors, toU32 } from "./common"

export class AssColor extends Bgra {
  static Colors = createColors(AssColor.fromName)
  static fromRgba(rgba: Rgba): AssColor {
    const c = toU32(
      (rgba.blue << 24) +
        (rgba.green << 16) +
        (rgba.red << 8) +
        (255 - rgba.alpha),
    )
    return new AssColor(c)
  }
  static fromName(name: ColorName): AssColor {
    return AssColor.fromRgba(Rgba.fromName(name))
  }
  toRgba() {
    const c = toU32(
      (this.red << 24) +
        (this.green << 16) +
        (this.blue << 8) +
        (255 - this.alpha),
    )
    return new Rgba(c)
  }
  invert(alpha = false): AssColor {
    return AssColor.fromRgba(this.toRgba().invert(alpha))
  }
}
