import { Button } from 'kontra'
import createSpace from '../systems/space'
import createComponentSystem from '../systems/components'
import createConnectionSystem from '../systems/connections'
import { LEVELS } from '../data'
// import createLevelEditorSystem from './systems/editor'

export const createLevel = (index = 0, onWin) => {
  const { connections, components } = LEVELS[index]

  const space = createSpace()

  const componentSystem = createComponentSystem(space)
  space.addSystem(componentSystem)

  const connectionSystem = createConnectionSystem(space)
  space.addSystem(connectionSystem)

  // const levelEditorSystem = createLevelEditorSystem(space)
  // space.addSystem(levelEditorSystem)
  space.nextLevelButton = Button({
    x: 650 + 20,
    y: 650,

    text: {
      text: 'Next',
      color: 'white',
      font: '20px Arial, sans-serif',
      anchor: { x: 0.5, y: 0.5 },
    },
    onDown() {
      onWin()
    },
  })

  space.nextLevelButton.key = 'nextLevelButton'
  space.nextLevelButton.textNode.color = 'rgba(255,255,255,0)'
  space.nextLevelButton.disable()
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
