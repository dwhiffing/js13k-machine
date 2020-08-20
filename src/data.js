export const LEVELS = [
  {
    components: [
      ['knob-1', 250, 450, 50],
      ['knob-2', 450, 450, 50],
      ['screen-1', 100, 100, 590, 300],
    ],
    connections: { 'knob-1': ['screen-1', 'x'], 'knob-2': ['screen-1', 'y'] },
  },
  {
    components: [
      ['knob-1', 250, 450, 50],
      ['knob-2', 450, 450, 50],
      ['screen-1', 100, 100, 590, 300],
      ['knob-3', 597.73828125, 479.72265625, 50],
    ],
    connections: { 'knob-1': ['screen-1', 'x'], 'knob-2': ['screen-1', 'y'] },
  },
]
