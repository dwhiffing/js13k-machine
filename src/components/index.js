import { Sprite } from 'kontra'
export { default as knob } from './knob'
export { default as screen } from './dotMatrix'
export { default as sine } from './sineWave'
export { default as toggle } from './toggle'

export const createComponent = ({
  key,
  x,
  y,
  width,
  height,
  render,
  updateValue,
  onMove,
  onUp,
  onDown,
  ...rest
}) => {
  return Sprite({
    key,
    x,
    y,
    width,
    height,
    render: function () {
      if (window.debug) {
        this.context.fillStyle = '#fff'
        this.context.fillText(this.key, 0, -10)
      }
      render.call(this)
    },
    updateValue: function (key, value) {
      if (!updateValue) {
        this[key] = value
        return
      }
      updateValue.call(this, key, value)
    },
    ...rest,
    onMove: function (event) {
      onMove && onMove.call(this, event)
      if (!this.pointerDown) return

      if (this.draggable) {
        this.x = event.offsetX - width / 2
        this.y = event.offsetY - height / 2
      }
    },
    onUp: function (event) {
      onMove && onMove.call(this, event)
      this.pointerDown = false
    },
    onDown: function (event) {
      onDown && onDown.call(this, event)
      this.pointerDown = true
    },
  })
}
