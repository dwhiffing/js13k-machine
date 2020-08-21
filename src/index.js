import { init, initPointer, GameLoop } from 'kontra'
import createSpace from './systems/space'
import createComponentSystem from './systems/components'
import createLevelEditorSystem from './systems/editor'
import createConnectionSystem from './systems/connections'
import { LEVELS } from './data'
import './utils'

// const { canvas } = init()
init()
initPointer()

let levelIndex = 0
let level

const createLevel = (index = 0, onWin) => {
  const { connections, components } = LEVELS[index]

  const space = createSpace()

  const componentSystem = createComponentSystem(space)
  space.addSystem(componentSystem)

  const connectionSystem = createConnectionSystem(space, onWin)
  space.addSystem(connectionSystem)

  const levelEditorSystem = createLevelEditorSystem(space)
  space.addSystem(levelEditorSystem)

  components.forEach((component) => {
    const type = component.key.split('-')[0]
    space.createEntity(type, component)
  })

  connections.forEach((connectionString) => {
    space.addConnection.call(space, connectionString)
  })

  return {
    space,
    shutdown: () => space.shutdown(),
  }
}

const startNextLevel = () => {
  if (levelIndex >= LEVELS.length) return
  level && level.shutdown()
  level = createLevel(levelIndex, startNextLevel)
  levelIndex++
}

startNextLevel()

GameLoop({
  update: () => level && level.space.update(),
  render: () => level && level.space.render(),
}).start()
