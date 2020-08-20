import { Sprite } from 'kontra'
import { clamp, between } from '../utils'
const LINE_WIDTH = 5

const createDotMatrix = (key, x, y, width, height, resolution = 20) => {
  return Sprite({
    key,
    x,
    y,
    width,
    height,
    resolution,
    activeDot: { x: 0, y: 0, color: '#fff' },
    goalDot: {
      x: between(0, width / resolution),
      y: between(0, height / resolution),
      color: '#0f0',
    },
    onMove: function (event) {
      if (!this.pointerDown) return

      if (this.draggable) {
        this.x = event.offsetX - width / 2
        this.y = event.offsetY - height / 2
      }
    },
    onUp: function (event) {
      this.pointerDown = false
    },
    onDown: function (event) {
      this.pointerDown = true
    },
    // TODO: refactor
    updateValue: function (key, value) {
      const max =
        key === 'x' ? width - this.resolution : height - this.resolution
      this.activeDot[key] = clamp(Math.floor(value), 0, max / this.resolution)
    },
    render: function () {
      this.isValid =
        this.activeDot.x === this.goalDot.x &&
        this.activeDot.y === this.goalDot.y
      this.context.strokeStyle = this.isValid ? 'green' : 'white'
      this.context.fillStyle = 'white'
      this.context.lineWidth = LINE_WIDTH

      this.context.beginPath()
      this.context.rect(0, 0, width + 9, height + 9)
      this.context.stroke()

      const dots = [this.goalDot, this.activeDot]

      dots.forEach((dot) => {
        this.context.beginPath()
        this.context.fillStyle = dot.color
        this.context.rect(
          dot.x * this.resolution + LINE_WIDTH,
          dot.y * this.resolution + LINE_WIDTH,
          this.resolution - 2,
          this.resolution - 2,
        )
        this.context.fill()
      })
    },
  })
}

export default createDotMatrix
