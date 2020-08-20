export const clamp = function (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export const between = (min, max) => Math.floor(Math.random() * max) + min
