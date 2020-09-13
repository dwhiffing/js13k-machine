import { createComponent } from './index'
import { Text } from 'kontra'
import { clamp } from 'kontra'
import { KNOB_SOUND } from '../data'
import { nearest } from '../utils'

const arrowWidth = 0.2
const createKnob = ({
  key,
  x = 0,
  y = 0,
  width = 50,
  height,
  value = 0,
  min = 0,
  max = 100,
}) => {
  const _value = clamp(min, max, value)
  let text = Text({
    text: value,
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
    min,
    max,
    width: width * 2,
    height: (height || width) * 2,
    angle: 0,
    value: _value,
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        value: this.value ? this.value : undefined,
        min: this.min ? this.min : undefined,
        max: this.max ? this.max : undefined,
      }
    },
    onDown: function (event) {
      this.__lastX = event.screenX
      this.__lastY = event.screenY
      this.lastValue = this.value
    },
    onMove: function (event) {
      if (!this.pointerDown || this.draggable) return
      const diff = this.max - this.min
      const diffX = this.__lastX - event.screenX
      const diffY = this.__lastY - event.screenY
      const offset = 1000 / diff
      const valueDiff = Math.abs(diffX) > Math.abs(diffY) ? diffX : diffY
      let newValue = this.lastValue - valueDiff / offset
      newValue = clamp(this.min, this.max, newValue)
      if (
        nearest(Math.floor(newValue), 5) !== nearest(Math.floor(this.value), 5)
      ) {
        playSound(KNOB_SOUND)
      }
      this.value = newValue
      text.text = Math.floor(this.value)
    },
    render: function () {
      window.debug && text.render()
      const percent = (this.value - this.min) / (this.max - this.min)
      this.angle = -0.3 + 5.7 * -percent

      this.context.strokeStyle = '#999'
      this.context.fillStyle = '#999'
      this.context.lineWidth = width / 20
      this.context.translate(width, width)
      this.context.rotate(this.angle)
      this.context.translate(-width, -width)
      this.context.strokeStyle = '#fff'

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
