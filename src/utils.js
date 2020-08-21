export const between = (min, max) => Math.floor(Math.random() * max) + min
export const nearest = (value, precision) =>
  Math.floor(value / precision) * precision
