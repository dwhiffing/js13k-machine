import { createComponent } from './index'
import { between } from '../utils'
import { clamp } from 'kontra'
const LINE_WIDTH = 5

// TODO: allow setting of active and goal dot via level data
const createDotMatrix = ({ key, x, y, width, height, resolution = 40 }) => {
  const getCoords = ({ x, y }) => {
    const maxX = (width - resolution) / resolution
    const maxY = (height - resolution) / resolution
    return {
      x: clamp(0, maxX, Math.floor(((x / 100) * width) / resolution)),
      y: clamp(0, maxY, Math.floor(((y / 100) * height) / resolution)),
    }
  }
  return createComponent({
    key,
    x,
    y,
    width,
    height,
    resolution,
    activeDot: { x: 0, y: 0, color: '#fff' },
    goalDot: {
      x: between(0, 100),
      y: between(0, 100),
      color: '#0f0',
    },
    toJSON: function () {
      return {
        key: this.key,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        resolution: this.resolution,
      }
    },
    updateValue: function (key, value) {
      this.activeDot[key] = value
    },
    render: function () {
      const activeCoords = getCoords(this.activeDot)
      const goalCoords = getCoords(this.goalDot)
      this.isValid =
        activeCoords.x === goalCoords.x && activeCoords.y === goalCoords.y

      this.context.strokeStyle = this.isValid ? 'green' : 'white'
      this.context.lineWidth = LINE_WIDTH
      this.context.beginPath()
      this.context.rect(0, 0, width + 9, height + 9)
      this.context.stroke()

      const dots = [this.goalDot, this.activeDot]

      dots.forEach((dot) => {
        const coords = getCoords(dot)
        this.context.beginPath()
        this.context.fillStyle = dot.color
        this.context.rect(
          coords.x * this.resolution + LINE_WIDTH,
          coords.y * this.resolution + LINE_WIDTH,
          this.resolution - 2,
          this.resolution - 2,
        )
        this.context.fill()
      })
    },
  })
}

export default createDotMatrix
