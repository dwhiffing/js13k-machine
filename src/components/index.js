import { Sprite } from 'kontra'
export { default as knob } from './knob'
export { default as gridScreen } from './gridScreen'
export { default as waveScreen } from './waveScreen'
export { default as numberScreen } from './numberScreen'
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
  value = 0,
  ...rest
}) => {
  return Sprite({
    key,
    x,
    y,
    width,
    height,
    value,
    render: function () {
      if (window.debug && this.draggable) {
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
