import createKnob from '../components/knob'
import guify from 'guify'

// press button to toggle edit mode
// when in edit mode, clicking selects an entity
// draggning moves it around
// when selected, can see all properties of entity in menu, including connections
// can modify values and connections
// once finished, can output updated values to console
const createLevelEditorSystem = (space, x, y) => {
  let components = []
  const gui = new guify({
    barMode: 'none',
    align: 'left',
    width: 200,
    root: document.getElementById('gui'),
  })
  window.debug = true
  const addPanel = (opts) => components.push(gui.Register(opts))
  const keydown = (e) => {
    if (e.key === ' ') {
      space.entities.forEach((c) => (c.draggable = true))
    }
    // TODO: need tools for adding different components
    // if (e.key === '1') {
    //   const knob = createKnob('knob-3', 0, 0, 50)
    //   knob.draggable = true
    //   knob.pointerDown = true
    //   space.addEntity(knob)
    // }
    if (e.key === 'F2') {
    }
  }

  const keyup = (e) => {
    if (e.key === ' ') {
      space.entities.forEach((c) => (c.draggable = false))
    }
  }

  document.addEventListener('keydown', keydown)
  document.addEventListener('keyup', keyup)
  space.connections.forEach(({ input, output }) => {
    addPanel({
      type: 'folder',
      label: `${input.key}-${output.key}`,
      open: false,
    })
    addPanel({
      type: 'text',
      folder: `${input.key}-${output.key}`,
      label: 'input.key',
      object: input,
      property: 'key',
    })
    addPanel({
      type: 'text',
      folder: `${input.key}-${output.key}`,
      label: 'output.key',
      object: output,
      property: 'key',
    })
    addPanel({
      type: 'text',
      folder: `${input.key}-${output.key}`,
      label: 'output.prop',
      object: output,
      property: 'prop',
    })
  })
  setTimeout(() => {
    addPanel({
      type: 'button',
      label: 'Copy',
      action: () => {
        const components = space.entities.map((e) => e.toJSON())
        navigator.clipboard.writeText(
          JSON.stringify({ components, connections: space.rawConnections }),
        )
      },
    })
  }, 10)

  return {
    addEntity: (entity) => {
      addPanel({
        type: 'folder',
        label: entity.key,
        open: false,
      })

      addPanel({
        type: 'range',
        label: 'x',
        property: 'x',
        min: 0,
        max: 1000,
        folder: entity.key,
        object: entity,
      })

      addPanel({
        type: 'range',
        label: 'y',
        property: 'y',
        min: 0,
        max: 1000,
        folder: entity.key,
        object: entity,
      })

      entity.value &&
        addPanel({
          type: 'display',
          label: 'value',
          property: 'value',
          folder: entity.key,
          object: entity,
        })
    },
    update: (time) => {},
    render: (time) => {},
    shutdown: () => {
      components.forEach((c) => gui.Remove(c))
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('keyup', keyup)
    },
  }
}

export default createLevelEditorSystem
