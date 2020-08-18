import { Sprite } from 'kontra'

const arrowWidth = 0.2
export const createKnob = (x, y, size, connections) => {
  return Sprite({
    x,
    y,
    width: size * 2,
    height: size * 2,
    angle: 0,
    connections: [],
    onMove: function (event) {
      if (this.pointerDown) {
        this.angle = this.lastAngle + (event.screenX - this.lastX) / 20
        connections.forEach(({ component, key }) =>
          component.updateValue(key, this.angle),
        )
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
      this.context.strokeStyle = 'white'
      this.context.fillStyle = 'white'
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
