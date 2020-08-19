import { track } from 'kontra'

const createComponentSystem = (canvas) => {
  const components = []
  const pointerMove = (e) => components.forEach((c) => c.onMove && c.onMove(e))
  const pointerUp = (e) => components.forEach((c) => c.onUp && c.onUp(e))
  canvas.addEventListener('pointermove', pointerMove)
  canvas.addEventListener('pointerup', pointerUp)
  return {
    components,
    addEntity: (entity) => {
      components.push(entity)
      track(entity)
    },
    update: () => {
      components.forEach((c) => c.update())
    },
    render: () => {
      components.forEach((c) => c.render())
    },
    shutdown: () => {
      canvas.removeEventListener('pointermove', pointerMove)
      canvas.removeEventListener('pointerup', pointerUp)
    },
  }
}

export default createComponentSystem
