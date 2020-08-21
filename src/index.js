import { init, initPointer, GameLoop } from 'kontra'
import createSpace from './systems/space'
import createComponentSystem from './systems/components'
import createLevelEditorSystem from './systems/editor'
import createConnectionSystem from './systems/connections'
import { LEVELS } from './data'
import { createDotMatrix, createSineWave, createKnob } from './components'
import './utils'

// const { canvas } = init()
init()
initPointer()

let levelIndex = 0
let level

const componentFactories = {
  screen: createDotMatrix,
  sine: createSineWave,
  knob: createKnob,
}

const createLevel = (index = 0, onWin) => {
  const { connections, components } = LEVELS[index]

  const space = createSpace(connections)

  const componentSystem = createComponentSystem(space)
  space.addSystem(componentSystem)

  const connectionSystem = createConnectionSystem(space, onWin)
  space.addSystem(connectionSystem)

  const levelEditorSystem = createLevelEditorSystem(space)
  space.addSystem(levelEditorSystem)

  components.forEach((component) => {
    const key = component.key.split('-')[0]
    space.addEntity(componentFactories[key](component))
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
