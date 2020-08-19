import { init, initPointer, GameLoop } from 'kontra'
import Level from './level'
import './utils'

const startGame = () => {
  const { canvas } = init()
  const level = new Level(canvas)

  GameLoop({
    update: () => level.components.forEach((c) => c.update()),
    render: () => level.components.forEach((c) => c.render()),
  }).start()
}

initPointer()
startGame()
