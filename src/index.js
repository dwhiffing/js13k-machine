import { init, initPointer, GameLoop } from 'kontra'
import createKnob from './components/knob'
import createDotMatrix from './components/dotMatrix'
import createSpace from './systems/space'
import createComponentSystem from './systems/components'
import createLevelEditorSystem from './systems/editor'
import { LEVELS } from './data'
import './utils'

const { canvas } = init()
initPointer()

let levelIndex = 0
let level

const createLevel = (index = 0, canvas, onWin) => {
  const levelData = LEVELS[index]

  const space = createSpace()
  space.connections = levelData.connections

  const componentSystem = createComponentSystem(canvas, levelData, onWin)
  space.addSystem(componentSystem)

  const levelEditorSystem = createLevelEditorSystem(space)
  space.addSystem(levelEditorSystem)

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
