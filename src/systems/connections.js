const createConnectionSystem = (space, onWin) => {
  const keydown = (e) => {
    if (e.key === ' ') {
      if (space.entities.every((c) => c.key !== 'screen-1' || c.isValid)) {
        onWin && onWin()
      }
    }
  }
  document.addEventListener('keydown', keydown)

  return {
    addEntity: (entity) => {},
    update: () => {
      space.connections.forEach(({ input, output }) => {
        const source = space.entities.find((c) => c.key === input.key)
        const target = space.entities.find((c) => c.key === output.key)
        target.updateValue(output.prop, source[input.prop])
      })
    },
    render: () => {},
    shutdown: () => {
      document.removeEventListener('keydown', keydown)
    },
  }
}

export default createConnectionSystem
