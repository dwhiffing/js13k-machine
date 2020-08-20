import createKnob from '../components/knob'

const createLevelEditorSystem = (space, x, y) => {
  const keydownListener = (e) => {
    if (e.key === '1') {
      const knob = createKnob('knob-3', 0, 0, 50)
      knob.draggable = true
      knob.pointerDown = true
      space.addEntity(knob)
    }
    if (e.key === 'F2') {
      const components = space.entities.map((e) => {
        if (e.key.match(/knob/)) {
          return [e.key, e.x, e.y, e.size]
        }
        if (e.key.match(/screen/)) {
          return [e.key, e.x, e.y, e.width, e.height]
        }
      })
      console.log(
        JSON.stringify({ components, connections: space.connections }),
      )
    }
  }

  window.addEventListener('keydown', keydownListener)

  return {
    addEntity: (entity) => {},
    update: (time) => {},
    render: (time) => {},
    shutdown: () => {
      window.removeEventListener('keydown', keydownListener)
    },
  }
}

export default createLevelEditorSystem
