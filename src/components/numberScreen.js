import { createComponent } from './index'
import { Text } from 'kontra'
import { setKey } from '../utils'

const createNumberScreen = ({ key, x, y, goal, value = 0 }) => {
  let text = Text({
    text: value,
    font: '52px Arial',
    color: '#fff',
    x: 100,
    y: 55,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: 'center',
  })
  return createComponent({
    key,
    x,
    y,
    width: 200,
    height: 150,
    value: [0, 0, 0],
    goal: [1, 2, 3],
    toJSON: function () {
      return {
        key: this.key,
        x: Math.floor(this.x),
        y: Math.floor(this.y),
        value,
        goal: { x: this.goal.x, y: this.goal.y },
      }
    },
    updateValue: function (key, value) {
      setKey(key, Math.floor(value / 11), this)
      text.text = this.value.reduce((result, n) => `${result}${n}`)
      if (this.value.every((v, i) => this.goal[i] === v)) {
        this.isValid = true
      }
    },
    render: function () {
      this.context.strokeStyle = this.isValid ? 'green' : 'white'
      this.context.lineWidth = 4
      this.context.beginPath()
      this.context.rect(0, 0, this.width + 9, this.height + 9)
      this.context.stroke()

      text.render()
    },
  })
}

export default createNumberScreen
