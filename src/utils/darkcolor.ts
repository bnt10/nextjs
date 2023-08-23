export function darkenColor(color: string, amount = 10) {
  const r = parseInt(color.slice(1, 3), 16) / 255
  const g = parseInt(color.slice(3, 5), 16) / 255
  const b = parseInt(color.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  let l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        throw new Error('Unexpected color value')
    }
    h /= 6
  }

  l -= l * (amount / 100)
  s -= s * (amount / 100)

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  const toRgb = (t: number) => {
    let to = t
    if (to < 0) to += 1
    if (to > 1) to -= 1
    if (to < 1 / 6) return p + (q - p) * 6 * to
    if (to < 1 / 2) return q
    if (to < 2 / 3) return p + (q - p) * (2 / 3 - to) * 6
    return p
  }

  const finalR = Math.round(toRgb(h + 1 / 3) * 255)
  const finalG = Math.round(toRgb(h) * 255)
  const finalB = Math.round(toRgb(h - 1 / 3) * 255)

  return `#${finalR.toString(16).padStart(2, '0')}${finalG
    .toString(16)
    .padStart(2, '0')}${finalB.toString(16).padStart(2, '0')}`
}
