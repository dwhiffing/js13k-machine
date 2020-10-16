import { init, initPointer, GameLoop } from 'kontra'
import { LEVELS as levels, MUSIC } from './data'
import { createWin } from './screens/win'
import { createMenu } from './screens/menu'
import { createLevel } from './screens/level'

import { levelCompleted } from './utils'
import '../lib/zzfx'
import '../lib/zzfxm'

init()
initPointer()

const initialLevels = JSON.parse(JSON.stringify(levels))
let musicPlaying = false
let levelIndex = 0
let screen

const startLevel = () => {
  screen && screen.shutdown()

  if (!window.muted && !musicPlaying) {
    musicPlaying = true
    let music = zzfxP(...zzfxM(...MUSIC[0]))
    music.loop = true
  }
  if (levels.every(levelCompleted)) {
    levelIndex = 0
    levels.forEach((_, i) => (levels[i] = initialLevels[i]))
    screen = createWin(() => (screen = createMenu(startLevel)))
  } else {
    screen = createLevel(levelIndex, nextLevel, prevLevel)
  }
}

const nextLevel = () => {
  if (levelIndex < levels.length - 1) levelIndex++
  startLevel()
}

const prevLevel = () => {
  if (levelIndex > 0) levelIndex--
  startLevel()
}

screen = createMenu(startLevel)

GameLoop({
  update: () => screen && screen.space.update(),
  render: () => screen && screen.space.render(),
}).start()
