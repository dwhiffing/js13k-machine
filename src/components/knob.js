import createComponent from './component'
import { clamp } from 'kontra'

const arrowWidth = 0.2
const createKnob = (key, x, y, width, height) => {
  return createComponent({
    key,
    x,
    y,
    width: width * 2,
    height: (height || width) * 2,
    angle: 0.3,
    value: 0,
    connections: [],
    onMove: function (event) {
      if (!this.pointerDown || this.draggable) return
      this.angle = this.lastAngle + (event.screenX - this.lastX) / 10
      this.angle = clamp(
        0.3,
        6,
        this.lastAngle + (event.screenX - this.lastX) / 10,
      )
      this.value = Math.floor(((this.angle - 0.3) / 5.7) * 100)
    },
    onDown: function (event) {
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.lastAngle = this.angle
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
