Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max)
}

Math.between = (min, max) => Math.floor(Math.random() * max) + min
