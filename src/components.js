import { track } from 'kontra'

const createComponentSystem = (canvas, data, onWin) => {
  const components = []

  const pointerMove = (e) => components.forEach((c) => c.onMove && c.onMove(e))
  const pointerUp = (e) => components.forEach((c) => c.onUp && c.onUp(e))

  const keyup = (e) => {
    if (e.key === ' ') {
      components.forEach((c) => (c.draggable = false))
      if (components.every((c) => c.key !== 'screen-1' || c.isValid)) {
        onWin && onWin()
      }
    }
  }
  const keydown = (e) => {
    if (e.key === ' ') {
      components.forEach((c) => (c.draggable = true))
    }
  }
  canvas.addEventListener('pointermove', pointerMove)
  canvas.addEventListener('pointerup', pointerUp)
  document.addEventListener('keydown', keydown)
  document.addEventListener('keyup', keyup)

  return {
    components,
    addEntity: (entity) => {
      components.push(entity)
      track(entity)
    },
    update: () => {
      // TODO: refactor
      Object.entries(data.connections).forEach(([key, value]) => {
        const connector = components.find((c) => c.key === key)
        const target = components.find((c) => c.key === value[0])
        target.updateValue(value[1], connector.angle)
      })
      components.forEach((c) => c.update())
    },
    render: () => {
      components.forEach((c) => c.render())
    },
    shutdown: () => {
      canvas.removeEventListener('pointermove', pointerMove)
      canvas.removeEventListener('pointerup', pointerUp)
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('keyup', keyup)
    },
  }
}

export default createComponentSystem
