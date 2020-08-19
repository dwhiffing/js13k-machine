const createSpace = () => {
  const systems = []
  const entities = []

  return {
    registerSystem: (system) => {
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
