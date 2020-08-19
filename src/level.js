import { track } from 'kontra'
import { createKnob } from './knob'
import { createDotMatrix } from './dotMatrix'

export default class Level {
  constructor(canvas) {
    const screen = createDotMatrix(100, 100, 590, 300)
    const knob = createKnob(250, 450, 50, [{ component: screen, key: 'x' }])
    const knob2 = createKnob(450, 450, 50, [{ component: screen, key: 'y' }])

    this.components = []
    this.components.push(knob)
    this.components.push(knob2)
    this.components.push(screen)
    this.components.forEach((c) => track(c))

    canvas.addEventListener('pointermove', (event) =>
      this.components.forEach((c) => c.onMove && c.onMove(event)),
    )

    canvas.addEventListener('pointerup', (event) =>
      this.components.forEach((c) => c.onUp && c.onUp(event)),
    )
  }
}
