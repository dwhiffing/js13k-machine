export const between = (min, max) => Math.floor(Math.random() * max) + min

export const levelCompleted = (level) =>
  level.components.every((c) => !c.goal || c.isValid)

export const nearest = (value, precision) =>
  Math.floor(value / precision) * precision

export const setKey = (key, value, targetObject) => {
  var keys = key.split('.'),
    obj = targetObject || window,
    keyPart
  while ((keyPart = keys.shift()) && keys.length) {
    obj = obj[keyPart]
  }
  obj[keyPart] = value
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2
  if (h < 2 * r) r = h / 2
  this.beginPath()
  this.moveTo(x + r, y)
  this.arcTo(x + w, y, x + w, y + h, r)
  this.arcTo(x + w, y + h, x, y + h, r)
  this.arcTo(x, y + h, x, y, r)
  this.arcTo(x, y, x + w, y, r)
  this.closePath()
  return this
}

window.muted = false
window.playSound = (sound) => !window.muted && zzfx(...sound)
window.toggleMute = () => (window.muted = !window.muted)
