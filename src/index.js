import { init, initPointer, GameLoop } from 'kontra'
import createSpace from './space'
import createKnob from './knob'
import createDotMatrix from './dotMatrix'
import createComponentSystem from './components'
import data from './levels'
// import createLevelEditorSystem from './editor'
import './utils'

const startGame = () => {
  const { canvas } = init()
  initPointer()

  const space = createSpace()

  const componentSystem = createComponentSystem(canvas, data)
  space.registerSystem(componentSystem)

  // const levelEditorSystem = createLevelEditorSystem(space)
  // space.registerSystem(levelEditorSystem)

  data.components.forEach(([type, ...rest]) => {
    if (type.match(/knob/)) {
      space.addEntity(createKnob(type, ...rest))
    }
    if (type.match(/screen/)) {
      space.addEntity(createDotMatrix(type, ...rest))
    }
  })

  Object.entries(data.connections).forEach(([key, value]) => {
    const connector = componentSystem.components.find((c) => c.key === key)
    const target = componentSystem.components.find((c) => c.key === value[0])
    connector.addConnection(target, value[1])
  })

  GameLoop({
    update: () => space.update(),
    render: () => space.render(),
  }).start()
}

startGame()
