const createConnectionSystem = (space) => {
  function uniq(value, index, self) {
    return self.indexOf(value) === index
  }

  return {
    addEntity: (entity) => {},
    update: () => {
      space.entities.forEach((entity) => {
        const connections = space.entities.filter(
          (c) => c.type === 'connection' && c.output.key === entity.key,
        )

        const propKeys = connections.map((c) => c.output.prop).filter(uniq)
        propKeys.forEach((propKey) => {
          const newValue = space.entities
            .filter((c) => c.type === 'connection')
            .reduce((sum, { input, output }) => {
              const source = space.entities.find((c) => c.key === input.key)
              if (output.key === entity.key && output.prop === propKey) {
                return sum + source[input.prop]
              }
              return sum
            }, 0)
          entity.updateValue(propKey, newValue)
        })
      })
    },
    render: () => {},
    shutdown: () => {},
  }
}

export default createConnectionSystem
