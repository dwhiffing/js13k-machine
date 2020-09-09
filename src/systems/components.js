import { track } from 'kontra'
import { WIN_SOUND } from '../data'

const createComponentSystem = (space) => {
  const pointerMove = (e) =>
    space.entities.forEach((c) => c.onMove && c.onMove(e))
  const pointerUp = (e) => space.entities.forEach((c) => c.onUp && c.onUp(e))
  document.addEventListener('pointermove', pointerMove)
  document.addEventListener('pointerup', pointerUp)
  let hasPlayedSound = false
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
        if (c.isValid && !hasPlayedSound) {
          hasPlayedSound = true
          space.nextLevelButton.textNode.color = 'rgba(255,255,255,1)'
          space.nextLevelButton.enable()
          zzfx(...WIN_SOUND)
        }
      })
    },
    shutdown: () => {
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerup', pointerUp)
    },
  }
}

export default createComponentSystem
