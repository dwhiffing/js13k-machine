import { Button } from 'kontra'
import createSpace from '../systems/space'
import createComponentSystem from '../systems/components'
import createConnectionSystem from '../systems/connections'
import { LEVELS } from '../data'
import createLevelEditorSystem from '../systems/editor'

const textParams = {
  color: 'white',
  font: '20px Arial, sans-serif',
  anchor: { x: 0.5, y: 0.5 },
}

export const createLevel = (index = 0, startNextLevel, startPrevLevel) => {
  const { connections, components } = LEVELS[index]

  const space = createSpace()

  const componentSystem = createComponentSystem(space)
  space.addSystem(componentSystem)

  const connectionSystem = createConnectionSystem(space)
  space.addSystem(connectionSystem)

  const levelEditorSystem = createLevelEditorSystem(space)
  space.addSystem(levelEditorSystem)

  space.prevLevelButton = Button({
    x: 70,
    y: 650,
    text: { ...textParams, text: 'Prev' },
    onDown() {
      startPrevLevel()
    },
  })

  space.nextLevelButton = Button({
    x: 670,
    y: 650,
    text: { ...textParams, text: 'Next' },
    onDown() {
      startNextLevel()
    },
  })

  space.prevLevelButton.key = 'prevLevelButton'
  space.addEntity(space.prevLevelButton)

  space.nextLevelButton.key = 'nextLevelButton'
  space.addEntity(space.nextLevelButton)

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
