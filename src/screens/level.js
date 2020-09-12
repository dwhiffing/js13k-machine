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
  const level = LEVELS[index]
  const { connections, components } = level

  const space = createSpace()
  space.index = index

  const componentSystem = createComponentSystem(space)
  space.addSystem(componentSystem)

  const connectionSystem = createConnectionSystem(space)
  space.addSystem(connectionSystem)

  const levelEditorSystem = createLevelEditorSystem(space)
  space.addSystem(levelEditorSystem)

  const saveLevel = () => {
    space.entities.forEach((e) => {
      const levelComponentIndex = LEVELS[index].components.findIndex(
        (l) => l.key === e.key,
      )
      if (levelComponentIndex !== -1) {
        const item = LEVELS[index].components[levelComponentIndex]
        LEVELS[index].components[levelComponentIndex] = {
          ...item,
          value: e.value,
          isValid: !!e.isValid,
        }
      }
    })
  }

  if (index > 0) {
    space.prevLevelButton = Button({
      x: 70,
      y: 750,
      text: { ...textParams, text: 'Prev' },
      onDown() {
        saveLevel()
        startPrevLevel()
      },
    })

    space.prevLevelButton.key = 'prevLevelButton'
    space.addEntity(space.prevLevelButton)
  }

  space.nextLevelButton = Button({
    x: 1300,
    y: 750,
    text: { ...textParams, text: 'Next' },
    onDown() {
      saveLevel()
      startNextLevel()
    },
  })

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
