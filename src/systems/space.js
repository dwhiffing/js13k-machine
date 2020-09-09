import * as componentFactories from '../components'

const createSpace = () => {
  const systems = []
  const entities = []
  const connections = []

  const createEntity = function (type, opts) {
    const id = entities.filter((e) => e.key.match(new RegExp(type))).length + 1
    const entity = componentFactories[type]({
      key: opts.key || `${type}-${id}`,
      ...opts,
    })
    if (entity) {
      this.addEntity(entity)
      return entity
    }
  }

  return {
    createEntity,
    connections,
    addConnection: function (connectionString = '') {
      const [input = '', output = ''] = connectionString.split(':')

      const connection = {
        input: {
          key: input.split('.')[0],
          prop: input.split('.').slice(1).join('.'),
        },
        output: {
          key: output.split('.')[0],
          prop: output.split('.').slice(1).join('.'),
        },
      }
      this.connections.push(connection)
      systems.forEach((system) => {
        system.addConnection && system.addConnection(connection)
      })
    },
    addSystem: function (system) {
      systems.push(system)
    },
    addEntity: function (entity) {
      entities.push(entity)
      systems.forEach((system) => {
        system.addEntity(entity)
      })
    },
    update: function () {
      systems.forEach((c) => c.update())
    },
    render: function () {
      systems.forEach((c) => c.render())
    },
    shutdown: function () {
      systems.forEach((system) => system.shutdown && system.shutdown())
    },
    entities,
  }
}

export default createSpace
