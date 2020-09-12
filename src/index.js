import { init, initPointer, GameLoop } from 'kontra'
import { LEVELS, MUSIC, LEVEL_SOUND } from './data'
import { createWin } from './screens/win'
import { createMenu } from './screens/menu'
import { createLevel } from './screens/level'

import './utils'
import '../lib/zzfx'
import '../lib/zzfxm'

init()
initPointer()

let levelIndex = -1
let level
const INITIAL_LEVELS = JSON.parse(JSON.stringify(LEVELS))
let muted = true
window.playSound = (sound) => !muted && zzfx(...sound)
window.toggleMute = () => (muted = !muted)
window.debug = false

const startLevel = () => {
  level && level.shutdown()
  if (levelIndex === -1 && !muted) {
    let music = zzfxP(...zzfxM(...MUSIC[0]))
    music.loop = true
  }
  if (levelIndex >= LEVELS.length) {
    levelIndex = LEVELS.length - 1
  }

  const inCompleteLevels = LEVELS.filter(
    (l) => !l.components.every((c) => !c.goal || (c.goal && c.isValid)),
  )

  if (inCompleteLevels.length === 0) {
    LEVELS.forEach((level, i) => {
      LEVELS[i] = INITIAL_LEVELS[i]
    })
    levelIndex = -1
    level = createWin(() => {
      level = createMenu(startNextLevel)
    })
  } else {
    level = createLevel(levelIndex, startNextLevel, startPrevLevel)
    levelIndex > 0 && playSound(LEVEL_SOUND)
  }
}

const startNextLevel = () => {
  levelIndex++
  startLevel()
}

const startPrevLevel = () => {
  if (levelIndex > 0) levelIndex--
  startLevel()
}

level = createMenu(startNextLevel)

GameLoop({
  update: () => level && level.space.update(),
  render: () => level && level.space.render(),
}).start()
