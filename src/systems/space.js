import * as componentFactories from '../components'

const createSpace = () => {
  const systems = []
  const entities = []

  const createEntity = function (type = '', opts) {
    let entity
    if (type === 'component') {
      const id =
        entities.filter((e) => e.key.match(new RegExp(opts.type))).length + 1
      entity = componentFactories[opts.type]({
        key: opts.key || `${opts.type}-${id}`,
        ...opts,
      })
    } else if (type === 'connection') {
      const [input = '', output = ''] = opts.connection.split(':')

      entity = {
        input: {
          key: input.split('.')[0],
          prop: input.split('.').slice(1).join('.'),
        },
        output: {
          key: output.split('.')[0],
          prop: output.split('.').slice(1).join('.'),
        },
      }
    }
    if (entity) {
      console.log(entity)
      entity.type = type
      this.addEntity(entity)
      return entity
    }
  }

  return {
    createEntity,
    entities,
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
  }
}

export default createSpace
