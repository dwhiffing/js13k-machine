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
  let enabled = false
  const gui = new guify({
    barMode: 'none',
    align: 'left',
    width: 300,
    root: document.getElementById('gui'),
  })
  window.debug = true
  const addPanel = (opts) => components.push(gui.Register(opts))
  addPanel({
    type: 'button',
    label: 'Copy level',
    action: () => {
      const components = space.entities.map((e) => e.toJSON())
      navigator.clipboard.writeText(
        JSON.stringify({
          components,
          connections: space.connections.map(
            (c) =>
              `${c.input.key}.${c.input.prop}:${c.output.key}.${c.output.prop}`,
          ),
        }),
      )
    },
  })
  const keydown = (e) => {
    if (e.key === 'p') {
      enabled = !enabled
      space.entities.forEach((c) => (c.draggable = enabled))
      return
    }
    if (!enabled) return
    let entity
    if (e.key === '1') {
      entity = space.createEntity('knob', { x: 300, y: 300 })
    }
    if (e.key === '2') {
      entity = space.createEntity('toggle', { x: 300, y: 300 })
    }
    if (e.key === '3') {
      entity = space.createEntity('gridScreen', { x: 300, y: 300 })
    }
    if (e.key === '4') {
      entity = space.createEntity('waveScreen', { x: 300, y: 300 })
    }
    if (e.key === '0') {
      const connectionString = window.prompt(
        'Enter new connection',
        'knob-1.value:gridScreen-1.x',
      )
      space.addConnection(connectionString)
    }
    if (entity) {
      entity.draggable = true
      entity.pointerDown = true
    }
  }

  document.addEventListener('keydown', keydown)

  return {
    addEntity: (entity) => {
      const minMax = ['min', 'max']
      const coords = ['x', 'y']
      const screens = ['active', 'goal']

      addPanel({
        type: 'folder',
        label: entity.key,
        open: false,
      })

      coords.forEach((key) => {
        if (typeof entity[key] !== 'number') return
        addPanel({
          type: 'range',
          label: key,
          property: key,
          min: 0,
          max: 1000,
          folder: entity.key,
          object: entity,
        })
      })

      entity.value &&
        addPanel({
          type: 'display',
          label: 'value',
          property: 'value',
          folder: entity.key,
          object: entity,
        })

      minMax.forEach((key) => {
        if (typeof entity[key] !== 'number') return
        addPanel({
          type: 'range',
          label: key,
          property: key,
          folder: entity.key,
          object: entity,
        })
      })

      screens.forEach((screenKey) => {
        if (!entity[screenKey]) return
        Object.keys(entity[screenKey]).forEach((key) => {
          addPanel({
            type: key.match(/^x$|^y$|amplitude|wavelength/)
              ? 'range'
              : key.match(/^color$/)
              ? 'color'
              : 'display',
            label: `${screenKey}-${key}`,
            property: key,
            folder: entity.key,
            object: entity[screenKey],
          })
        })
      })
    },
    addConnection: function (connection) {
      const { input, output } = connection
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
    },
    update: (time) => {},
    render: (time) => {},
    shutdown: () => {
      components.forEach((c) => gui.Remove(c))
      document.getElementById('gui').innerHTML = ''
      document.removeEventListener('keydown', keydown)
    },
  }
}

export default createLevelEditorSystem
