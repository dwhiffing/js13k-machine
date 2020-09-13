import { createComponent } from './index'

// prettier-ignore
export const LEVEL_SOUND = [,,350,,,.35,2,1.83,,,,,,1.2,.4,.1,.13,.87,.05]
// prettier-ignore
export const LEVEL_SOUND2 = [,,383,.41,.38,.34,1,1.28,,,3,.06,.07,,,.1,,.71,.07]
// prettier-ignore
export const LEVEL_SOUND3 = [,,540,.04,.04,.19,1,1.83,8.1,,,,,,1.3,,,.81,.08]
// prettier-ignore
export const LEVEL_SOUND4 = [,,655,.04,,,1,1.95,51,,,,,.4,-1.1,.3,,,.02]
// prettier-ignore
export const LEVEL_SOUND5 = [,,248,,.06,.28,1,1.71,,,,,,.2,.6,.1,.12,.62,.05,.08]
// prettier-ignore
export const LEVEL_SOUND6 = [,,1375,,.01,.26,,.97,,,,,,.1,,,,.62,.02]
// prettier-ignore
export const LEVEL_SOUND7 = [,,463,,.02,.17,,2.07,-7,,,,,.9,,.4,.03,.69,.01,.18]
// prettier-ignore
export const LEVEL_SOUND8 = [,,20,.04,,.07,4,2.67,,-82,,,,,,,.02,.07,,.64]
// prettier-ignore
export const LEVEL_SOUND9 = [,,133,,,.44,1,.66,,-0.7,,,,,,,,.89,.07,.23]

const SOUNDS = [
  LEVEL_SOUND,
  LEVEL_SOUND2,
  LEVEL_SOUND3,
  LEVEL_SOUND4,
  LEVEL_SOUND5,
  LEVEL_SOUND6,
  LEVEL_SOUND7,
  LEVEL_SOUND8,
  LEVEL_SOUND9,
]

const createSpeaker = ({
  key,
  x,
  y,
  width = 80,
  height = 120,
  value = 0,
  min = 0,
  max = 100,
}) => {
  return createComponent({
    key,
    x,
    y,
    value,
    width: width,
    height: height,
    min,
    max,
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
    updateValue: function (key, value) {
      if (this.draggable) return
      if (this[key] === 0 && value > 0) {
        setTimeout(() => {
          playSound(SOUNDS[value - 1])
        }, 100)
      }
      this[key] = value
    },
    render: function () {
      this.context.strokeStyle = this.draggable ? 'gray' : '#444'
      this.context.fillStyle = this.draggable ? 'gray' : '#444'
      this.context.lineWidth = 8

      this.context.beginPath()
      this.context.roundRect(0, 0, width, height, 30)
      this.context.stroke()
      this.value && this.context.fill()
    },
  })
}

export default createSpeaker
