import { init, initPointer, track, GameLoop } from 'kontra'
import { createKnob } from './sprites/knob'
import { createDotMatrix } from './sprites/dotMatrix'

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max)
}

Math.between = (min, max) => Math.floor(Math.random() * max) + min

let { canvas } = init()
initPointer()

let loop = GameLoop({
  update: function () {
    components.forEach((c) => {
      c.update()
    })
  },
  render: function () {
    components.forEach((c) => {
      c.render()
    })
  },
})

const screen = createDotMatrix(100, 100, 590, 300)
const knob = createKnob(250, 450, 50, [{ component: screen, key: 'x' }])
const knob2 = createKnob(450, 450, 50, [{ component: screen, key: 'y' }])

const components = []
components.push(knob)
components.push(knob2)
components.push(screen)
components.forEach((c) => track(c))

canvas.addEventListener('pointermove', (event) =>
  components.forEach((c) => c.onMove && c.onMove(event)),
)

canvas.addEventListener('pointerup', (event) =>
  components.forEach((c) => c.onUp && c.onUp(event)),
)

loop.start()
