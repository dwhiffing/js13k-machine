export const LEVELS = [
  {
    components: [
      { key: 'knob-1', x: 250, y: 450, width: 50 },
      { key: 'knob-2', x: 450, y: 450, width: 50 },
      { key: 'screen-1', x: 100, y: 100, width: 590, height: 300 },
    ],
    connections: [
      {
        input: { key: 'knob-1', prop: 'value' },
        output: { key: 'screen-1', prop: 'x' },
      },
      {
        input: { key: 'knob-2', prop: 'value' },
        output: { key: 'screen-1', prop: 'y' },
      },
    ],
  },
  {
    components: [
      { key: 'knob-1', x: 250, y: 450, width: 50 },
      { key: 'knob-2', x: 450, y: 450, width: 50 },
      { key: 'sine-1', x: 100, y: 100, width: 590, height: 300 },
    ],
    connections: [
      {
        input: { key: 'knob-1', prop: 'value' },
        output: { key: 'sine-1', prop: 'wavelength' },
      },
      {
        input: { key: 'knob-2', prop: 'value' },
        output: { key: 'sine-1', prop: 'amplitude' },
      },
    ],
  },
]
