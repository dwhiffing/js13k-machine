// TODO: need to make levels more compact
export const LEVELS = [
  {
    components: [
      { key: 'toggle-1', x: 73, y: 316, value: 6, max: 6 },
      { key: 'toggle-2', x: 189, y: 316, max: 12 },
      { key: 'toggle-3', x: 74, y: 417, max: 24 },
      { key: 'toggle-4', x: 189, y: 423, value: 48, max: 48 },
      { key: 'toggle-5', x: 71, y: 100, max: 6 },
      { key: 'toggle-6', x: 188, y: 97, value: 12, max: 12 },
      { key: 'toggle-7', x: 72, y: 208, max: 24 },
      { key: 'toggle-8', x: 187, y: 201, max: 48 },
      {
        key: 'gridScreen-1',
        x: 337,
        y: 80,
        goal: { x: 58, y: 40 },
        width: 400,
        height: 400,
        resolution: 24,
      },
    ],
    connections: [
      'toggle-1.value:gridScreen-1.x',
      'toggle-2.value:gridScreen-1.x',
      'toggle-3.value:gridScreen-1.x',
      'toggle-4.value:gridScreen-1.x',
      'toggle-5.value:gridScreen-1.y',
      'toggle-6.value:gridScreen-1.y',
      'toggle-7.value:gridScreen-1.y',
      'toggle-8.value:gridScreen-1.y',
    ],
  },
  {
    components: [
      { key: 'knob-1', x: 250, y: 450, value: 39, min: 0, max: 100 },
      { key: 'knob-2', x: 450, y: 450, value: 60, min: 0, max: 100 },
      {
        key: 'gridScreen-1',
        x: 100,
        y: 100,
        width: 590,
        height: 300,
        resolution: 40,
      },
    ],
    connections: ['knob-1.value:gridScreen-1.x', 'knob-2.value:gridScreen-1.y'],
  },
  {
    components: [
      { key: 'knob-1', x: 250, y: 450, max: 100 },
      { key: 'knob-2', x: 450, y: 450, value: 5.48828125, max: 100 },
      {
        key: 'waveScreen-1',
        x: 100,
        y: 100,
        goal: { amplitude: 20.07, wavelength: 40.33 },
        width: 590,
        height: 300,
      },
    ],
    connections: [
      'knob-1.value:waveScreen-1.wavelength',
      'knob-2.value:waveScreen-1.amplitude',
    ],
  },
  {
    components: [],
    connections: [],
  },
]

// prettier-ignore
export const MUSIC = [
  [[[.5,0,120,1.5,,2.5,,,-.001,,3,,,,,,,,,1]],[[[,-1,18,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],[,1,,,,,,,,,,,,,,,23,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],[,-1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,22,,,,,,,,,,,,,,,,,,,,,,,],[,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,12,,,,,,,,,,,]]],[0],,{"title":"New Song","instruments":["Synth Wave"],"patterns":["Pattern 0"]}],
]

// prettier-ignore
export const CLICK_SOUND = [,,,,.01,,,,.1,,,,.01]

// prettier-ignore
export const WIN_SOUND = [,0,0,.24,.3,.3,3,0,,,4,.01,.02,,1,,.04,.7,.09,.4]

// prettier-ignore
export const LEVEL_SOUND = [,0,0,.24,.3,.3,3,0,,,4,.01,.02,,1,,.04,.7,.09,.4]
