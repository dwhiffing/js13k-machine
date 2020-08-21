const n = 6
// TODO: need to make levels more compact
export const LEVELS = [
  {
    components: [
      { key: 'toggle-1', x: 73, y: 316, max: n * 1, value: n },
      { key: 'toggle-2', x: 189, y: 316, max: n * 2 },
      { key: 'toggle-3', x: 74, y: 417, max: n * 4 },
      { key: 'toggle-4', x: 189, y: 423, max: n * 8, value: n * 8 },
      { key: 'toggle-5', x: 71, y: 100, max: n * 1 },
      { key: 'toggle-6', x: 188, y: 97, max: n * 2, value: n * 2 },
      { key: 'toggle-7', x: 72, y: 208, max: n * 4 },
      { key: 'toggle-8', x: 187, y: 201, max: n * 8 },
      {
        key: 'screen-1',
        x: 337,
        y: 80,
        width: 400,
        height: 400,
        resolution: 24,
      },
    ],
    connections: [
      'toggle-1.value:screen-1.x',
      'toggle-2.value:screen-1.x',
      'toggle-3.value:screen-1.x',
      'toggle-4.value:screen-1.x',
      'toggle-5.value:screen-1.y',
      'toggle-6.value:screen-1.y',
      'toggle-7.value:screen-1.y',
      'toggle-8.value:screen-1.y',
    ],
  },
  {
    components: [
      { key: 'knob-1', x: 250, y: 450, value: 39, min: 0, max: 100 },
      { key: 'knob-2', x: 450, y: 450, value: 60, min: 0, max: 100 },
      {
        key: 'screen-1',
        x: 100,
        y: 100,
        width: 590,
        height: 300,
        resolution: 40,
      },
    ],
    connections: ['knob-1.value:screen-1.x', 'knob-2.value:screen-1.y'],
  },
  {
    components: [
      { key: 'knob-1', x: 250, y: 450 },
      { key: 'knob-2', x: 450, y: 450 },
      { key: 'sine-1', x: 100, y: 100, width: 590, height: 300 },
    ],
    connections: [
      'knob-1.value:sine-1.wavelength',
      'knob-2.value:sine-1.amplitude',
    ],
  },
  {
    components: [],
    connections: [],
  },
]
