import createComponent from './component'
import { clamp } from 'kontra'
import { between } from '../utils'
const DEFAULT_WIDTH = 500
const DEFAULT_HEIGHT = 300
const LINE_WIDTH = 5
const createSineWave = (key, x, y, width, height) => {
  return createComponent({
    key,
    x,
    y,
    width,
    height,
    active: { wavelength: 9.5, amplitude: 90, color: '#ffffff' },
    goal: {
      wavelength: between(0, 20) * 5,
      amplitude: between(0, 20) * 5,
      color: 'green',
    },
    updateValue: function (key, value) {
      if (key === 'wavelength') {
        this.active[key] = Math.floor(value / 5) * 5
      }
      if (key === 'amplitude') {
        this.active[key] = Math.floor(value / 5) * 5
      }
    },
    render: function () {
      this.isValid =
        this.active.wavelength === this.goal.wavelength &&
        this.active.amplitude === this.goal.amplitude

      this.context.strokeStyle = this.isValid ? 'green' : 'white'
      this.context.lineWidth = LINE_WIDTH
      this.context.beginPath()
      this.context.rect(0, 0, width + 9, height + 9)
      this.context.stroke()

      const lines = [this.active, this.goal]

      lines.forEach((line) => {
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
      })
    },
  })
}

export default createSineWave
