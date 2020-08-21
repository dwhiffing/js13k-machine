export const LEVELS = [
  {
    components: [
      ['knob-1', 250, 450, 50],
      ['knob-2', 450, 450, 50],
      ['sine-1', 100, 100, 600, 300],
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
  {
    components: [
      ['knob-1', 250, 450, 50],
      ['knob-2', 450, 450, 50],
      ['screen-1', 100, 100, 590, 300],
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
]
