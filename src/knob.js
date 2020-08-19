import { Sprite } from 'kontra'

// TODO: make component class to hold drag and connection logic
const arrowWidth = 0.2
const createKnob = (key, x, y, size) => {
  return Sprite({
    key,
    x,
    y,
    size,
    width: size * 2,
    height: size * 2,
    angle: 0,
    connections: [],
    onMove: function (event) {
      if (!this.pointerDown) return

      if (this.draggable) {
        this.x = event.offsetX - size
        this.y = event.offsetY - size
      } else {
        this.angle = this.lastAngle + (event.screenX - this.lastX) / 20
      }
    },
    onUp: function (event) {
      this.pointerDown = false
    },
    onDown: function (event) {
      this.pointerDown = true
      this.lastX = event.screenX
      this.lastY = event.screenY
      this.lastAngle = this.angle
    },
    render: function () {
      this.context.strokeStyle = this.draggable ? 'gray' : 'white'
      this.context.fillStyle = this.draggable ? 'gray' : 'white'
      this.context.lineWidth = size / 20
      this.context.translate(size, size)
      this.context.rotate(this.angle)
      this.context.translate(-size, -size)

      this.context.beginPath()
      this.context.arc(size, size, size, 0, 2 * Math.PI)
      this.context.stroke()

      this.context.beginPath()
      this.context.moveTo(size - size * arrowWidth, size * -0.001)
      this.context.lineTo(size, size * -0.2)
      this.context.lineTo(size + size * arrowWidth, size * -0.001)
      this.context.closePath()
      this.context.fill()
    },
  })
}

export default createKnob
