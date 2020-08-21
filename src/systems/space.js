const createSpace = (connections) => {
  const systems = []
  const entities = []

  const _connections = connections.map((c) => {
    const [input, output] = c.split(':')
    return {
      input: { key: input.split('.')[0], prop: input.split('.')[1] },
      output: { key: output.split('.')[0], prop: output.split('.')[1] },
    }
  })

  return {
    rawConnections: connections,
    connections: _connections,
    addSystem: (system) => {
      systems.push(system)
    },
    addEntity: (entity) => {
      entities.push(entity)
      systems.forEach((system) => {
        system.addEntity(entity)
      })
    },
    update: () => {
      systems.forEach((c) => c.update())
    },
    render: () => {
      systems.forEach((c) => c.render())
    },
    shutdown: () => {
      systems.forEach((system) => system.shutdown && system.shutdown())
    },
    entities,
  }
}

export default createSpace
