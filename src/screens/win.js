import { Button, Text } from 'kontra'
import { GAME_OVER_SOUND } from '../data'

export const createWin = (onDown) => {
  zzfx(...GAME_OVER_SOUND)
  return {
    shutdown() {},
    space: {
      update() {},
      render() {
        let text = Text({
          text: 'You win!',
          font: '68px Arial',
          color: '#333',
          x: 400,
          y: 200,
          anchor: { x: 0.5, y: 0.5 },
          textAlign: 'center',
        })
        let button = Button({
          x: 350,
          y: 550,

          text: {
            text: 'Back to Menu',
            color: 'white',
            font: '20px Arial, sans-serif',
            anchor: { x: 0.5, y: 0.5 },
          },
          onDown() {
            onDown()
          },
        })

        text.render()
        button.render()
      },
    },
  }
}
