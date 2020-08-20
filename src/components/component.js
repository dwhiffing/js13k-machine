import { Sprite } from 'kontra'

const createComponent = ({
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
    render,
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

export default createComponent
