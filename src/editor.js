const createLevelEditorSystem = (space, x, y) => {
  const keydownListener = (e) => {
    if (e.key === '1') {
      // create knob
      // space.addEntity(knob)
    }
    if (e.key === 'F2') {
      // output level/connection data
      // console.log(JSON.stringify(level))
    }
  }

  window.addEventListener('keydown', keydownListener)

  return {
    addEntity: (entity) => {
      // make components draggable when added
    },
    update: (time) => {},
    render: (time) => {},
    shutdown: () => {
      window.removeEventListener('keydown', keydownListener)
    },
  }
}

export default createLevelEditorSystem
