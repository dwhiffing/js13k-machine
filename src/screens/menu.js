import { Button, Text } from 'kontra'

export const createMenu = (onDown) => {
  return {
    shutdown() {},
    space: {
      update() {},
      render() {
        let text = Text({
          text: 'The Machine',
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
            text: 'Start Game',
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
