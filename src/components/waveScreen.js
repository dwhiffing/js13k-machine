import { createComponent } from './index'
import { between, nearest } from '../utils'
import { WIN_SOUND } from '../data'
import { createLedSprite, createGlow, clamp } from '../led'
import { Text } from 'kontra'

const DEFAULT_WIDTH = 500
const DEFAULT_HEIGHT = 300
const LINE_WIDTH = 5

const createWaveScreen = ({
  key,
  x,
  y,
  goal,
  amplitude = 20,
  wavelength = 9.5,
  isValid,
  width = 600,
  height = 300,
}) => {
  const led = createLedSprite()
  const greenGlow = createGlow(0, 1, 0, 160)
  const redGlow = createGlow(1, 0, 0, 80)
  let text = Text({
    text: 0,
    font: '12px Arial',
    color: '#fff',
    x: 50,
    y: 55,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: 'center',
  })
  return createComponent({
    key,
    x,
    y,
    width,
    height,
    isValid,
    active: { wavelength, amplitude, color: '#ffffff' },
    goal: {
      wavelength: (goal && goal.wavelength) || between(0, 20) * 5,
      amplitude: (goal && goal.amplitude) || between(0, 20) * 5,
      color: 'white',
      alpha: 0.1,
    },
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        goal: {
          amplitude: this.goal.amplitude,
          wavelength: this.goal.wavelength,
        },
        isValid: !!this.isValid,
        amplitude: this.active.amplitude,
        wavelength: this.active.wavelength,
        width: this.width,
        height: this.height,
      }
    },
    updateValue: function (key, value) {
      if (key === 'amplitude') {
        this.active[key] = clamp(nearest(value, 5), 0, 100)
      }
      if (key === 'wavelength') {
        this.active[key] = clamp(nearest(value, 5), 0, 100)
      }
      text.text = `${this.active.amplitude}, ${this.active.wavelength}`
      const newValid =
        Math.floor(this.active.wavelength) ===
          Math.floor(this.goal.wavelength) &&
        Math.floor(this.active.amplitude) === Math.floor(this.goal.amplitude)

      if (this.isValid !== newValid && newValid) playSound(WIN_SOUND)

      this.isValid = newValid
    },
    render: function () {
      window.debug && text.render()
      this.context.lineWidth = LINE_WIDTH * 2
      this.context.beginPath()
      this.context.strokeStyle = '#444'
      this.context.roundRect(0, 30, width + 9, height + 9, 20)
      this.context.stroke()
      this.context.lineWidth = LINE_WIDTH
      this.context.strokeStyle = 'white'
      this.context.drawImage(led, this.width + 40, this.height + 40)
      this.context.drawImage(
        this.isValid ? greenGlow : redGlow,
        this.width + (this.isValid ? -30 : 10),
        this.height + (this.isValid ? -30 : 10),
      )

      const lines = [this.active, this.goal]

      lines.forEach((line) => {
        this.context.save()
        this.context.globalAlpha = line.alpha || 1
        this.context.beginPath()
        const offset = -100 + height / 2 + 5
        var counter = 0,
          _x = 0,
          _y = y + offset
        this.context.moveTo(_x, _y)

        const amplitude = Math.floor((line.amplitude - 50) / 2) * 5
        const wavelength = Math.floor(line.wavelength / 6 + 3) * 3

        var increase =
          (((90 / y) * Math.PI) / wavelength) * (DEFAULT_WIDTH / width)
        for (i = 0; i <= 0 + width + 5; i = i + 5) {
          _x = i
          _y =
            y +
            offset -
            Math.sin(counter) * amplitude * (height / DEFAULT_HEIGHT)
          counter += increase
          this.context.lineTo(_x, _y)
        }
        this.context.strokeStyle = line.color
        this.context.stroke()
        this.context.restore()
      })
    },
  })
}

export default createWaveScreen
