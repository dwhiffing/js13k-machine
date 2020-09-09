import { createComponent } from './index'
import { between } from '../utils'
import { clamp } from 'kontra'
import { WIN_SOUND } from '../data'
const LINE_WIDTH = 5

const createGridScreen = ({
  key,
  x,
  y,
  goal,
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
    active: { x: 0, y: 0, color: '#fff' },
    goal: {
      x: (goal && goal.x) || between(0, 100),
      y: (goal && goal.y) || between(0, 100),
      color: '#0f0',
    },
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        goal: { x: this.goal.x, y: this.goal.y },
        width: this.width,
        height: this.height,
        resolution: this.resolution,
      }
    },
    updateValue: function (key, value) {
      if (key === 'x' || key === 'y') {
        this.active[key] = Math.floor(value)
      } else if (key === 'resolution') {
        this[key] = value
      }
    },
    render: function () {
      const activeCoords = this.getCoords(this.active)
      const goalCoords = this.getCoords(this.goal)
      this.isValid =
        activeCoords.x === goalCoords.x && activeCoords.y === goalCoords.y

      if(this.isValid && !this.hasPlayedSound) {
        this.hasPlayedSound = true
        zzfx(...WIN_SOUND)
      }

      this.context.strokeStyle = this.isValid ? 'green' : 'white'
      this.context.lineWidth = LINE_WIDTH
      this.context.beginPath()
      this.context.rect(0, 0, width + 9, height + 9)
      this.context.stroke()

      const dots = [this.goal, this.active]

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
