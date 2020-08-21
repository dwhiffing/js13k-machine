import { createComponent } from './index'

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
    toJSON: function () {
      return {
        key: this.key,
        x: this.x,
        y: this.y,
        min: this.min,
        max: this.max,
      }
    },
    onDown: function (event) {
      this.value = this.value ? min : max
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
