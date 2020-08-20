import { track } from 'kontra'

const createComponentSystem = (space, data, onWin) => {
  const pointerMove = (e) =>
    space.entities.forEach((c) => c.onMove && c.onMove(e))
  const pointerUp = (e) => space.entities.forEach((c) => c.onUp && c.onUp(e))
  const keydown = (e) => {
    if (e.key === ' ') {
      if (space.entities.every((c) => c.key !== 'screen-1' || c.isValid)) {
        onWin && onWin()
      }
    }
  }
  document.addEventListener('pointermove', pointerMove)
  document.addEventListener('pointerup', pointerUp)
  document.addEventListener('keydown', keydown)

  return {
    addEntity: (entity) => {
      track(entity)
    },
    update: () => {
      // TODO: refactor
      Object.entries(data.connections).forEach(([key, value]) => {
        const connector = space.entities.find((c) => c.key === key)
        const target = space.entities.find((c) => c.key === value[0])
        target.updateValue(value[1], connector.angle)
      })
      space.entities.forEach((c) => c.update())
    },
    render: () => {
      space.entities.forEach((c) => c.render())
    },
    shutdown: () => {
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerup', pointerUp)
      document.removeEventListener('keydown', keydown)
    },
  }
}

export default createComponentSystem
