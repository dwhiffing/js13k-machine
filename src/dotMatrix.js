import { Sprite } from 'kontra'
const LINE_WIDTH = 5

const createDotMatrix = (key, x, y, width, height, resolution = 10) => {
  return Sprite({
    key,
    x,
    y,
    width,
    height,
    resolution,
    activeDot: { x: 0, y: 0, color: '#fff' },
    goalDot: {
      x: Math.between(0, width / resolution),
      y: Math.between(0, height / resolution),
      color: '#0f0',
    },
    updateValue: function (key, value) {
      const max =
        key === 'x' ? width - this.resolution : height - this.resolution
      this.activeDot[key] = Math.floor(value).clamp(0, max / this.resolution)
    },
    render: function () {
      const isValid =
        this.activeDot.x === this.goalDot.x &&
        this.activeDot.y === this.goalDot.y
      this.context.strokeStyle = isValid ? 'green' : 'white'
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
