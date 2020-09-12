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
let muted = true
window.playSound = (sound) => !muted && zzfx(...sound)
window.toggleMute = () => (muted = !muted)

const startLevel = () => {
  level && level.shutdown()
  if (levelIndex === -1) {
    // let music = zzfxP(...zzfxM(...MUSIC[0]))
    // music.loop = true
  }
  if (levelIndex >= LEVELS.length) {
    // TODO: need to check if all levels are valid before calling this
    level = createWin(() => {
      levelIndex = 0
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
