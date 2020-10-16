import { track } from 'kontra'

const createComponentSystem = (space) => {
  const getComponents = () =>
    space.entities.filter((e) => e.type === 'component')
  const pointerUp = (e) => getComponents().forEach((c) => c.onUp && c.onUp(e))
  const pointerMove = (e) =>
    getComponents().forEach((c) => c.onMove && c.onMove(e))

  document.addEventListener('pointermove', pointerMove)
  document.addEventListener('pointerup', pointerUp)

  return {
    addEntity: (entity) => {
      if (entity.type === 'component') {
        track(entity)
      }
    },
    update: () => {
      getComponents().forEach((c) => c.update())
    },
    render: () => {
      getComponents().forEach((c) => c.render())
    },
    shutdown: () => {
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerup', pointerUp)
    },
  }
}

export default createComponentSystem
