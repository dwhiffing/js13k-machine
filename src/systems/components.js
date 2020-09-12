import { track } from 'kontra'
const createComponentSystem = (space) => {
  const pointerMove = (e) =>
    space.entities.forEach((c) => c.onMove && c.onMove(e))
  const pointerUp = (e) => space.entities.forEach((c) => c.onUp && c.onUp(e))
  document.addEventListener('pointermove', pointerMove)
  document.addEventListener('pointerup', pointerUp)
  return {
    addEntity: (entity) => {
      track(entity)
    },
    update: () => {
      space.entities.forEach((c) => c.update())
    },
    render: () => {
      space.entities.forEach((c) => {
        c.render()
      })
    },
    shutdown: () => {
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerup', pointerUp)
    },
  }
}

export default createComponentSystem
