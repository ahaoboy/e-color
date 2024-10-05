export function parseHex(hex: string) {
  if (hex[0] === "#") {
    return parseInt(hex.slice(1), 16)
  }
  return parseInt(hex, 16)
}

// 0x01234567
export function get01(n: number): number {
  return (n >> 24) & 0xff
}
export function get23(n: number): number {
  return (n >> 16) & 0xff
}
export function get45(n: number): number {
  return (n >> 8) & 0xff
}
export function get67(n: number): number {
  return n & 0xff
}

export function set01(n: number, v: number): number {
  return (n & 0x00ffffff) | (v << 24)
}
export function set23(n: number, v: number): number {
  return (n & 0xff00ffff) | (v << 16)
}
export function set45(n: number, v: number): number {
  return (n & 0xffff00ff) | (v << 8)
}
export function set67(n: number, v: number): number {
  return (n & 0xffffff00) | v
}

export function toU32(n: number) {
  return n >>> 0
}
