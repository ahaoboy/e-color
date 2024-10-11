import {
  get01,
  get23,
  get45,
  get67,
  set01,
  set23,
  set45,
  set67,
  parseHex,
} from "./share"

declare class Color {
  color: number
  byteCount: number
  get blue(): number
  get green(): number
  get red(): number
  set blue(n: number)
  set green(n: number)
  set red(n: number)
  constructor(color: string | number)
  toRgb(): Rgb
  toBgr(): Bgr
  toRgba(alpha?: number, invertAlpha?: boolean): Rgba
  toBgra(alpha?: number, invertAlpha?: boolean): Bgra
  toArgb(alpha?: number, invertAlpha?: boolean): Argb
  toAbgr(alpha?: number, invertAlpha?: boolean): Abgr
  toHex(prefix?: string): string
  invert(): Color
}
export declare class Rgb extends Color {
  invert(): Rgb
}
export declare class Bgr extends Color {
  invert(): Bgr
}

declare class ColorAlpha extends Color {
  invertAlpha: boolean
  constructor(color: string | number, invertAlpha?: boolean)
  get rawAlpha(): number
  set rawAlpha(_: number)
  get alpha(): number
  set alpha(v: number)
  toRgba(): Rgba
  toBgra(): Bgra
  toArgb(): Argb
  toAbgr(): Abgr
}

export declare class Rgba extends ColorAlpha {
  invert(alpha?: boolean): Rgba
}
export declare class Bgra extends ColorAlpha {
  invert(alpha?: boolean): Bgra
}
export declare class Argb extends ColorAlpha {
  invert(alpha?: boolean): Argb
}

export declare class Abgr extends ColorAlpha {
  invert(alpha?: boolean): Abgr
}

function Color(this: Color, color: number | string) {
  this.color = typeof color === "number" ? color : parseHex(color)
}

Color.prototype = new Color(0) as Color
// Color.prototype = Object.create(Color.prototype);
// Color.prototype.constructor = Color;

Color.prototype.byteCount = 6
Color.prototype.toRgba = function (alpha = 0, invertAlpha?: boolean) {
  const c =
    (this.red << 24) |
    (this.green << 16) |
    (this.blue << 8) |
    (invertAlpha ? 255 - alpha : alpha)
  return new Rgba(c, invertAlpha)
}
Color.prototype.toRgb = function () {
  const c = (this.red << 16) | (this.green << 8) | this.blue
  return new Rgb(c)
}
Color.prototype.toBgr = function () {
  return this.toRgb().toBgr()
}
Color.prototype.toBgra = function (alpha = 0, invertAlpha?: boolean) {
  return this.toRgba(alpha, invertAlpha).toBgra()
}
Color.prototype.toArgb = function (alpha = 0, invertAlpha?: boolean) {
  return this.toRgba(alpha, invertAlpha).toArgb()
}
Color.prototype.toAbgr = function (alpha = 0, invertAlpha?: boolean) {
  return this.toRgba(alpha, invertAlpha).toAbgr()
}
Color.prototype.invert = function () {
  const c = ~this.color & 0x00ffffff
  return new Rgb(c)
}

Color.prototype.toHex = function (prefix = "") {
  const hex = (this.color >>> 0).toString(16).padStart(this.byteCount, "0")
  return (prefix + hex).toUpperCase()
}

function ColorAlpha(
  this: ColorAlpha,
  color: string | number,
  invertAlpha = false,
) {
  Color.call(this, color)
  this.invertAlpha = invertAlpha
  this.byteCount = 8
  Object.defineProperty(this, "alpha", {
    get: function (this: ColorAlpha) {
      return this.invertAlpha ? 255 - this.rawAlpha : this.rawAlpha
    },
    set: function (this: ColorAlpha, v: number) {
      this.rawAlpha = this.invertAlpha ? 255 - v : v
    },
  })
}

ColorAlpha.prototype = new Color(0) as ColorAlpha
// ColorAlpha.prototype = Object.create(Color.prototype);
// ColorAlpha.prototype.constructor = Color;
ColorAlpha.prototype.byteCount = 8

ColorAlpha.prototype.toRgba = function () {
  const c =
    (this.red << 24) | (this.green << 16) | (this.blue << 8) | this.alpha
  return new Rgba(c, this.invertAlpha)
}
ColorAlpha.prototype.toBgra = function () {
  const c =
    (this.blue << 24) | (this.green << 16) | (this.red << 8) | this.alpha
  return new Bgra(c, this.invertAlpha)
}
ColorAlpha.prototype.toAbgr = function () {
  const c =
    (this.alpha << 24) | (this.blue << 16) | (this.green << 8) | this.red
  return new Abgr(c, this.invertAlpha)
}
ColorAlpha.prototype.toArgb = function () {
  const c =
    (this.alpha << 24) | (this.red << 16) | (this.green << 8) | this.blue
  return new Argb(c, this.invertAlpha)
}
ColorAlpha.prototype.toRgb = function () {
  const c = (this.red << 16) | (this.green << 8) | this.blue
  return new Rgb(c)
}

ColorAlpha.prototype.toBgr = function () {
  const c = (this.blue << 16) | (this.green << 8) | this.red
  return new Rgb(c)
}

export function Rgba(this: Rgba, color: string | number, invertAlpha = false) {
  ColorAlpha.call(this, color, invertAlpha)
  Object.defineProperty(this, "red", {
    get: function () {
      return get01(this.color)
    },
    set: function (v: number) {
      this.color = set01(this.color, v)
    },
  })
  Object.defineProperty(this, "green", {
    get: function () {
      return get23(this.color)
    },
    set: function (v: number) {
      this.color = set23(this.color, v)
    },
  })
  Object.defineProperty(this, "blue", {
    get: function () {
      return get45(this.color)
    },
    set: function (v: number) {
      this.color = set45(this.color, v)
    },
  })
  Object.defineProperty(this, "rawAlpha", {
    get: function () {
      return get67(this.color)
    },
    set: function (v: number) {
      this.color = set67(this.color, v)
    },
  })
}
Rgba.prototype = Object.create(ColorAlpha.prototype)
Rgba.prototype.constructor = ColorAlpha

// Rgba.prototype.toRgba = function () {
//   return new Rgba(this.color, this.invertAlpha);
// };

Rgba.prototype.invert = function (alpha = false) {
  const c = alpha ? ~this.color : (~this.color & 0xffffff00) | this.alpha
  return new Rgba(c, this.invertAlpha)
}

export function Rgb(this: Rgb, color: string | number) {
  Color.call(this, color)

  Object.defineProperty(this, "red", {
    get: function () {
      return get23(this.color)
    },
    set: function (v: number) {
      this.color = set23(this.color, v)
    },
  })
  Object.defineProperty(this, "green", {
    get: function () {
      return get45(this.color)
    },
    set: function (v: number) {
      this.color = set45(this.color, v)
    },
  })
  Object.defineProperty(this, "blue", {
    get: function () {
      return get67(this.color)
    },
    set: function (v: number) {
      this.color = set67(this.color, v)
    },
  })
}

Rgb.prototype = new Color(0) as Rgb
// Rgb.prototype = Object.create(Color.prototype);
// Rgb.prototype.constructor = Color;

Rgb.prototype.toRgba = function (alpha = 0, invertAlpha?: boolean) {
  const c = (this.color << 8) | (invertAlpha ? 255 - alpha : alpha)
  return new Rgba(c, invertAlpha)
}
Rgb.prototype.toBgr = function () {
  const c = (this.blue << 16) | (this.green << 8) | this.red
  return new Bgr(c)
}

export function Bgra(this: Bgra, color: string | number, invertAlpha = false) {
  ColorAlpha.call(this, color, invertAlpha)

  Object.defineProperty(this, "blue", {
    get: function () {
      return get01(this.color)
    },
    set: function (v: number) {
      this.color = set01(this.color, v)
    },
  })
  Object.defineProperty(this, "green", {
    get: function () {
      return get23(this.color)
    },
    set: function (v: number) {
      this.color = set23(this.color, v)
    },
  })
  Object.defineProperty(this, "red", {
    get: function () {
      return get45(this.color)
    },
    set: function (v: number) {
      this.color = set45(this.color, v)
    },
  })
  Object.defineProperty(this, "rawAlpha", {
    get: function () {
      return get67(this.color)
    },
    set: function (v: number) {
      this.color = set67(this.color, v)
    },
  })
}
Bgra.prototype = new ColorAlpha(0) as Bgra

Bgra.prototype.invert = function (alpha = false) {
  const c = alpha ? ~this.color : (~this.color & 0xffffff00) | this.alpha
  return new Bgra(c)
}

export function Bgr(this: Bgr, color: string | number) {
  Color.call(this, color)

  Object.defineProperty(this, "blue", {
    get: function () {
      return get23(this.color)
    },
    set: function (v: number) {
      this.color = set01(this.color, v)
    },
  })
  Object.defineProperty(this, "green", {
    get: function () {
      return get45(this.color)
    },
    set: function (v: number) {
      this.color = set23(this.color, v)
    },
  })
  Object.defineProperty(this, "red", {
    get: function () {
      return get67(this.color)
    },
    set: function (v: number) {
      this.color = set45(this.color, v)
    },
  })
}

Bgr.prototype = new Color(0) as Bgr

export function Argb(this: Argb, color: string | number, invertAlpha = false) {
  ColorAlpha.call(this, color, invertAlpha)

  Object.defineProperty(this, "rawAlpha", {
    get: function () {
      return get01(this.color)
    },
    set: function (v: number) {
      this.color = set01(this.color, v)
    },
  })
  Object.defineProperty(this, "red", {
    get: function () {
      return get23(this.color)
    },
    set: function (v: number) {
      this.color = set23(this.color, v)
    },
  })
  Object.defineProperty(this, "green", {
    get: function () {
      return get45(this.color)
    },
    set: function (v: number) {
      this.color = set45(this.color, v)
    },
  })
  Object.defineProperty(this, "blue", {
    get: function () {
      return get67(this.color)
    },
    set: function (v: number) {
      this.color = set67(this.color, v)
    },
  })
}
Argb.prototype = new ColorAlpha(0) as Argb

Argb.prototype.invert = function (alpha = false) {
  const c = alpha
    ? ~this.color
    : (~this.color & 0x00ffffff) | (this.alpha << 24)
  return new Bgra(c, this.invertAlpha)
}
export function Abgr(this: Argb, color: string | number, invertAlpha = false) {
  ColorAlpha.call(this, color, invertAlpha)

  Object.defineProperty(this, "rawAlpha", {
    get: function () {
      return get01(this.color)
    },
    set: function (v: number) {
      this.color = set01(this.color, v)
    },
  })
  Object.defineProperty(this, "blue", {
    get: function () {
      return get23(this.color)
    },
    set: function (v: number) {
      this.color = set23(this.color, v)
    },
  })
  Object.defineProperty(this, "green", {
    get: function () {
      return get45(this.color)
    },
    set: function (v: number) {
      this.color = set45(this.color, v)
    },
  })
  Object.defineProperty(this, "red", {
    get: function () {
      return get67(this.color)
    },
    set: function (v: number) {
      this.color = set67(this.color, v)
    },
  })
}
Abgr.prototype = new ColorAlpha(0) as Abgr

Abgr.prototype.invert = function (alpha = false) {
  const c = alpha
    ? ~this.color
    : (~this.color & 0x00ffffff) | (this.alpha << 24)
  return new Bgra(c, this.invertAlpha)
}
