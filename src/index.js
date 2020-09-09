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

let levelIndex = 0
let level

const startNextLevel = () => {
  level && level.shutdown()
  if (levelIndex === 0) {
    let music = zzfxP(...zzfxM(...MUSIC[0]))
    music.loop = true
  }
  if (levelIndex >= LEVELS.length) {
    level = createWin(() => {
      levelIndex = 0
      level = createMenu(startNextLevel)
    })
  } else {
    level = createLevel(levelIndex, startNextLevel)
    levelIndex > 0 && zzfx(...LEVEL_SOUND)
    levelIndex++
  }
}

level = createMenu(startNextLevel)

GameLoop({
  update: () => level && level.space.update(),
  render: () => level && level.space.render(),
}).start()
