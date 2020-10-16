import { Button, Text } from 'kontra'

export const createMenu = (onDown) => {
  let text = Text({
    text: 'The Machine',
    font: '150px Arial',
    color: '#555',
    x: 708,
    y: 200,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: 'center',
  })
  let text2 = Text({
    text: 'By Daniel Whiffing',
    font: '24px Arial',
    color: '#333',
    x: 708,
    y: 370,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: 'center',
  })
  let button = Button({
    x: 600,
    y: 550,

    text: {
      text: 'Start Game',
      color: 'white',
      font: '40px Arial, sans-serif',
      anchor: { x: 0, y: 0.5 },
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
        text2.render()
        button.render()
      },
    },
  }
}
