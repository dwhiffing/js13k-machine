const createConnectionSystem = (space, onWin) => {
  const keydown = (e) => {
    if (e.key === ' ') {
      if (space.entities.every((c) => c.key !== 'screen-1' || c.isValid)) {
        onWin && onWin()
      }
    }
  }
  document.addEventListener('keydown', keydown)
  function uniq(value, index, self) {
    return self.indexOf(value) === index
  }

  return {
    addEntity: (entity) => {},
    update: () => {
      space.entities.forEach((entity) => {
        const connections = space.connections.filter(
          (c) => c.output.key === entity.key,
        )
        const propKeys = connections.map((c) => c.output.prop).filter(uniq)
        propKeys.forEach((propKey) => {
          const newValue = space.connections.reduce(
            (sum, { input, output }) => {
              const source = space.entities.find((c) => c.key === input.key)
              if (output.key === entity.key && output.prop === propKey) {
                return sum + source[input.prop]
              }
              return sum
            },
            0,
          )
          entity.updateValue(propKey, newValue)
        })
      })
    },
    render: () => {},
    shutdown: () => {
      document.removeEventListener('keydown', keydown)
    },
  }
}

export default createConnectionSystem
