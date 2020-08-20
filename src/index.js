import { init, initPointer, GameLoop } from 'kontra'
import createKnob from './components/knob'
import createDotMatrix from './components/dotMatrix'
import createSpace from './systems/space'
import createComponentSystem from './systems/components'
import createLevelEditorSystem from './systems/editor'
import { LEVELS } from './data'
import './utils'
import createConnectionSystem from './systems/connections'

// const { canvas } = init()
init()
initPointer()

let levelIndex = 0
let level

const createLevel = (index = 0, onWin) => {
  const { connections, components } = LEVELS[index]

  const space = createSpace(connections)

  const componentSystem = createComponentSystem(space)
  space.addSystem(componentSystem)

  const connectionSystem = createConnectionSystem(space, onWin)
  space.addSystem(connectionSystem)

  const levelEditorSystem = createLevelEditorSystem(space)
  space.addSystem(levelEditorSystem)

  components.forEach(([type, ...rest]) => {
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
  level = createLevel(levelIndex, startNextLevel)
  levelIndex++
}

startNextLevel()

GameLoop({
  update: () => level && level.space.update(),
  render: () => level && level.space.render(),
}).start()
