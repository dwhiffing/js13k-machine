import { createComponent } from './index'
import { CLICK_SOUND } from '../data'

const createToggle = ({
  key,
  x,
  y,
  width = 30,
  height,
  value = 0,
  min = 0,
  max = 100,
}) => {
  return createComponent({
    key,
    x,
    y,
    value,
    width: width * 2,
    height: (height || width) * 2,
    min,
    max,
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        value: this.value ? this.value : undefined,
        min: this.min ? this.min : undefined,
        max: this.max ? this.max : undefined,
      }
    },
    onDown: function (event) {
      if (this.draggable) return
      this.value = this.value ? this.min : this.max
      zzfx(...CLICK_SOUND)
    },
    render: function () {
      this.context.strokeStyle = this.draggable ? 'gray' : 'white'
      this.context.fillStyle = this.draggable ? 'gray' : 'white'
      this.context.lineWidth = width / 5

      this.context.beginPath()
      this.context.arc(width, width, width, 0, 2 * Math.PI)
      this.context.stroke()
      this.value && this.context.fill()
    },
  })
}

export default createToggle
