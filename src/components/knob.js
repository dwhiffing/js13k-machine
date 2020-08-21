import { createComponent } from './index'
import { clamp } from 'kontra'

const arrowWidth = 0.2
const createKnob = ({
  key,
  x,
  y,
  width,
  height,
  value = 0,
  min = 0,
  max = 100,
}) => {
  const _value = clamp(min, max, value)
  return createComponent({
    key,
    x,
    y,
    min,
    max,
    width: width * 2,
    height: (height || width) * 2,
    angle: clamp(0.3, 6, _value / 16),
    value: _value,
    connections: [],
    onMove: function (event) {
      if (!this.pointerDown || this.draggable) return
      this.value = this.lastValue + (event.screenX - this.lastX) / 3
      this.value = clamp(min, max, this.value)
      this.angle = clamp(0.3, 6, this.value / 16)
    },
    onDown: function (event) {
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.lastValue = this.value
    },
    render: function () {
      this.context.strokeStyle = this.draggable ? 'gray' : 'white'
      this.context.fillStyle = this.draggable ? 'gray' : 'white'
      this.context.lineWidth = width / 20
      this.context.translate(width, width)
      this.context.rotate(this.angle)
      this.context.translate(-width, -width)

      this.context.beginPath()
      this.context.arc(width, width, width, 0, 2 * Math.PI)
      this.context.stroke()

      this.context.beginPath()
      this.context.moveTo(width - width * arrowWidth, width * -0.001)
      this.context.lineTo(width, width * -0.2)
      this.context.lineTo(width + width * arrowWidth, width * -0.001)
      this.context.closePath()
      this.context.fill()
    },
  })
}

export default createKnob
