import { createComponent } from './index'
import { between } from '../utils'
import { clamp } from 'kontra'
import { WIN_SOUND } from '../data'
import { createLedSprite, createGlow } from '../led'
const LINE_WIDTH = 5

const createGridScreen = ({
  key,
  x,
  y,
  isValid,
  value,
  goal,
  width = 400,
  height = 400,
  resolution = 40,
}) => {
  console.log(isValid)
  const led = createLedSprite()
  const greenGlow = createGlow(0, 1, 0)
  const redGlow = createGlow(1, 0, 0)
  return createComponent({
    key,
    x,
    y,
    width,
    height,
    isValid,
    resolution,
    value: value || { x: 0, y: 0, color: '#ffffff' },
    goal: {
      x: (goal && goal.x) || between(0, 100),
      y: (goal && goal.y) || between(0, 100),
      color: '#fff',
      alpha: 0.05,
    },
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        isValid: !!this.isValid,
        goal: { x: this.goal.x, y: this.goal.y },
        width: this.width,
        height: this.height,
        resolution: this.resolution,
      }
    },
    updateValue: function (key, value) {
      if (key === 'x' || key === 'y') {
        this.value[key] = Math.floor(value)
      } else if (key === 'resolution') {
        this[key] = value
      }
      const activeCoords = this.getCoords(this.value)
      const goalCoords = this.getCoords(this.goal)
      const newValid =
        activeCoords.x === goalCoords.x && activeCoords.y === goalCoords.y
      if (this.isValid !== newValid && newValid) playSound(WIN_SOUND)
      this.isValid = newValid
    },
    render: function () {
      this.context.strokeStyle = 'white'
      this.context.lineWidth = LINE_WIDTH
      this.context.beginPath()
      this.context.rect(0, 0, width + 9, height + 9)
      this.context.stroke()
      this.context.drawImage(led, this.width + 20, this.height + 20)
      this.context.drawImage(
        this.isValid ? greenGlow : redGlow,
        this.width - 10,
        this.height - 10,
      )

      const dots = [this.goal, this.value]

      dots.forEach((dot) => {
        const coords = this.getCoords(dot)
        this.context.save()
        this.context.globalAlpha = dot.alpha || 1
        this.context.beginPath()
        this.context.fillStyle = dot.color
        this.context.rect(
          coords.x * this.resolution + LINE_WIDTH,
          coords.y * this.resolution + LINE_WIDTH,
          this.resolution - 2,
          this.resolution - 2,
        )
        this.context.fill()
        this.context.restore()
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
