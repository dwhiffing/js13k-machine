export const clamp = (num, min, max) =>
  num < min ? min : num > max ? max : num

const mix = (a, b, m) => (1 - m) * a + m * b
const mixCol = (a, b, m) => ({
  r: mix(a.r, b.r, m),
  g: mix(a.g, b.g, m),
  b: mix(a.b, b.b, m),
  a: mix(a.a, b.a, m),
})

const halfV = { x: 0.5, y: 0.5 }
const subV = (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y })
const mulVS = (v, s) => ({ x: v.x * s, y: v.y * s })
const lenV = (v) => Math.sqrt(v.x * v.x + v.y * v.y)
const smoothstep = (min, max, value) => {
  const x = clamp((value - min) / (max - min), 0, 1)
  return x * x * (3 - 2 * x)
}
const v11 = { x: 1, y: 1 }
export const newCol = (r = 1, g = 1, b = 1, a = 1) => ({ r, g, b, a })
const white = newCol(1, 1, 1, 1)
const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  return [canvas, context]
}

const generateImage = (width, height, cb) => {
  const [canvas, context] = createCanvas(width, height)
  const imageData = context.getImageData(0, 0, width, height)
  const buf = new ArrayBuffer(imageData.data.length)
  const buf8 = new Uint8ClampedArray(buf)
  const data32 = new Uint32Array(buf)
  const v = {}

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      v.x = x / (width - 1)
      v.y = y / (height - 1)
      const c = cb(v)
      data32[y * width + x] =
        (clamp(c.a * 255, 0, 255) << 24) | // alpha
        (clamp(c.b * 255, 0, 255) << 16) | // blue
        (clamp(c.g * 255, 0, 255) << 8) | // green
        clamp(c.r * 255, 0, 255)
    }
  }
  imageData.data.set(buf8)
  context.putImageData(imageData, 0, 0)

  return canvas
}

const addCol = (a, b) => {
  return {
    r: a.r + b.r * b.a,
    g: a.g + b.g * b.a,
    b: a.b + b.b * b.a,
    a: a.a + b.a,
  }
}

const createInnerShadow = (v) => {
  const d = lenV(v) * 2
  const dm = lenV(subV(v, mulVS(v11, 0.05))) * 2
  const val = smoothstep(1, 0.5, dm * 0.8) * 0.2
  const a = smoothstep(1, 0.85, d)
  return newCol(val, val, val, a)
}
const createLedGlass = (v) => {
  const d = lenV(v) * 2 * 1.2
  const val = smoothstep(1, 0.0, d) * 0.25
  const a = smoothstep(0.99, 0.9, d)
  return newCol(val, val, val, a)
}
const createLedGlassReflection = (v) => {
  const d = lenV(v) * 2 * 1.5
  const dm = lenV(subV(v, mulVS(v11, 0.14))) * 1.01
  const val = smoothstep(1, 0.6, d) * smoothstep(0.2, 0.5, dm)
  return newCol(val, val, val, val)
}
export const createLedSprite = () =>
  generateImage(21, 21, (v) => {
    const cv = subV(v, halfV)
    const innerShadow = createInnerShadow(cv)
    const ledGlass = createLedGlass(cv)
    const ledGlassReflection = createLedGlassReflection(cv)

    return addCol(addCol(innerShadow, ledGlass), ledGlassReflection)
  })

export const createGlow = (r, g, b) =>
  generateImage(80, 80, (v) => {
    const cv = subV(v, halfV)
    const d = 1 - lenV(cv) * 2
    const result = mixCol(newCol(r, g, b), white, smoothstep(0.6, 0.89, d))

    const a = smoothstep(0.0, 1, d)
    return newCol(result.r, result.g, result.b, a * a * a)
  })
