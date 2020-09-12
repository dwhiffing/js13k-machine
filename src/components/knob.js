import { createComponent } from './index'
import { Text } from 'kontra'
import { clamp } from 'kontra'
import { CLICK_SOUND } from '../data'
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
      this.lastValue = this.value
    },
    onMove: function (event) {
      if (!this.pointerDown || this.draggable) return
      const diff = this.max - this.min
      const offset = 1000 / diff
      let newValue = this.lastValue - (this.__lastX - event.screenX) / offset
      newValue = clamp(this.min, this.max, newValue)
      if (
        nearest(Math.floor(newValue), 5) !== nearest(Math.floor(this.value), 5)
      ) {
        playSound([
          ,
          ,
          167,
          ,
          ,
          0.08,
          ,
          2.96,
          ,
          ,
          171,
          0.35,
          ,
          0.1,
          -5,
          ,
          ,
          0.1,
          0.03,
        ])
      }
      this.value = newValue
      text.text = Math.floor(this.value)
    },
    render: function () {
      window.debug && text.render()
      const percent = (this.value - this.min) / (this.max - this.min)
      this.angle = -0.3 + 5.7 * -percent

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
