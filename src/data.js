export const LEVELS = [
  {
    components: [
      ['knob-1', 250, 450, 50],
      ['knob-2', 450, 450, 50],
      ['screen-1', 100, 100, 590, 300],
    ],
    connections: [
      {
        input: { key: 'knob-1', prop: 'angle' },
        output: { key: 'screen-1', prop: 'x' },
      },
      {
        input: { key: 'knob-2', prop: 'angle' },
        output: { key: 'screen-1', prop: 'y' },
      },
    ],
  },
  {
    components: [
      ['knob-1', 250, 450, 50],
      ['knob-2', 450, 450, 50],
      ['screen-1', 100, 100, 590, 300],
      ['knob-3', 597.73828125, 479.72265625, 50],
    ],
    connections: [
      {
        input: { key: 'knob-1', prop: 'angle' },
        output: { key: 'screen-1', prop: 'x' },
      },
      {
        input: { key: 'knob-2', prop: 'angle' },
        output: { key: 'screen-1', prop: 'y' },
      },
    ],
  },
]
