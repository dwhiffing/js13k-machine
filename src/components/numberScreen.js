import { createComponent } from './index'
import { Text } from 'kontra'
import { WIN_SOUND } from '../data'
import { setKey } from '../utils'
import { createLedSprite, createGlow } from '../led'

const createNumberScreen = ({ key, x, y, goal, value, isValid }) => {
  let text = Text({
    text: value,
    font: '52px Arial',
    color: '#fff',
    x: 100,
    y: 55,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: 'center',
  })
  const led = createLedSprite()
  const greenGlow = createGlow(0, 1, 0)
  const redGlow = createGlow(1, 0, 0)
  return createComponent({
    key,
    x,
    y,
    width: 200,
    height: 150,
    value: value || [0, 0, 0],
    isValid,
    goal: [1, 2, 3],
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        isValid: !!this.isValid,
        value,
        goal: { x: this.goal.x, y: this.goal.y },
      }
    },
    updateValue: function (key, value) {
      setKey(key, Math.floor(value / 11), this)
      text.text = this.value.reduce((result, n) => `${result}${n}`)
      const newValid = this.value.every((v, i) => this.goal[i] === v)
      if (this.isValid !== newValid && newValid) playSound(WIN_SOUND)
      this.isValid = newValid
    },
    render: function () {
      this.context.strokeStyle = 'white'
      this.context.drawImage(led, this.width + 20, this.height + 20)
      this.context.drawImage(
        this.isValid ? greenGlow : redGlow,
        this.width - 10,
        this.height - 10,
      )
      this.context.lineWidth = 4
      this.context.beginPath()
      this.context.rect(0, 0, this.width + 9, this.height + 9)
      this.context.stroke()

      text.render()
    },
  })
}

export default createNumberScreen
