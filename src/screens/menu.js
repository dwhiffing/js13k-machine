import { Button, Text } from 'kontra'

export const createMenu = (onDown) => {
  let text = Text({
    text: 'The Machine',
    font: '68px Arial',
    color: '#333',
    x: 708,
    y: 200,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: 'center',
  })
  let button = Button({
    x: 650,
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
  return {
    shutdown() {},
    space: {
      update() {},
      render() {
        text.render()
        button.render()
      },
    },
  }
}
