import createComponent from './component'

const arrowWidth = 0.2
const createKnob = (key, x, y, width, height) => {
  return createComponent({
    key,
    x,
    y,
    width: width * 2,
    height: (height || width) * 2,
    angle: 0,
    connections: [],
    onMove: function (event) {
      console.log(event, this, this.pointerDown, this.draggable)
      if (!this.pointerDown || this.draggable) return
      this.angle = this.lastAngle + (event.screenX - this.lastX) / 10
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
