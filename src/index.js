import { init, initPointer, GameLoop } from 'kontra'
import createSpace from './space'
import createKnob from './knob'
import createDotMatrix from './dotMatrix'
import createComponentSystem from './components'
import LEVELS from './levels'
import createLevelEditorSystem from './editor'
import './utils'

const startGame = () => {
  const { canvas } = init()
  initPointer()

  let levelIndex = 0
  let level

  const startNextLevel = () => {
    level && level.shutdown()
    level = createLevel(levelIndex, canvas, startNextLevel)
    levelIndex++
  }

  startNextLevel()

  GameLoop({
    update: () => level && level.space.update(),
    render: () => level && level.space.render(),
  }).start()
}

const createLevel = (index = 0, canvas, onWin) => {
  const levelData = LEVELS[index]

  const space = createSpace()
  space.connections = levelData.connections

  const componentSystem = createComponentSystem(canvas, levelData, onWin)
  space.registerSystem(componentSystem)

  const levelEditorSystem = createLevelEditorSystem(space)
  space.registerSystem(levelEditorSystem)

  levelData.components.forEach(([type, ...rest]) => {
    if (type.match(/knob/)) {
      space.addEntity(createKnob(type, ...rest))
    }
    if (type.match(/screen/)) {
      space.addEntity(createDotMatrix(type, ...rest))
    }
  })

  return {
    space,
    shutdown: () => space.shutdown(),
  }
}

startGame()
