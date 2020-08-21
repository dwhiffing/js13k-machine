import { createComponent } from './index'
import { between } from '../utils'
import { clamp } from 'kontra'
const LINE_WIDTH = 5

// TODO: allow setting of active and goal dot via level data
const createGridScreen = ({
  key,
  x,
  y,
  width = 400,
  height = 400,
  resolution = 40,
}) => {
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
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        width: this.width,
        height: this.height,
        resolution: this.resolution,
      }
    },
    updateValue: function (key, value) {
      if (key === 'x' || key === 'y') {
        this.activeDot[key] = Math.floor(value)
      } else if (key === 'resolution') {
        this[key] = value
      }
    },
    render: function () {
      const activeCoords = this.getCoords(this.activeDot)
      const goalCoords = this.getCoords(this.goalDot)
      this.isValid =
        activeCoords.x === goalCoords.x && activeCoords.y === goalCoords.y

      this.context.strokeStyle = this.isValid ? 'green' : 'white'
      this.context.lineWidth = LINE_WIDTH
      this.context.beginPath()
      this.context.rect(0, 0, width + 9, height + 9)
      this.context.stroke()

      const dots = [this.goalDot, this.activeDot]

      dots.forEach((dot) => {
        const coords = this.getCoords(dot)
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
    getCoords: function ({ x, y }) {
      const maxX = (this.width - this.resolution) / this.resolution
      const maxY = (this.height - this.resolution) / this.resolution
      return {
        x: clamp(
          0,
          maxX,
          Math.floor(((x / 100) * this.width) / this.resolution),
        ),
        y: clamp(
          0,
          maxY,
          Math.floor(((y / 100) * this.height) / this.resolution),
        ),
      }
    },
  })
}

export default createGridScreen
