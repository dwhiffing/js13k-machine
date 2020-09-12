// TODO: need to make levels more compact
export const LEVELS = [
  {
    components: [
      { key: 'toggle-1', x: 587, y: 557, value: 0, max: 50 },
      { key: 'toggle-2', x: 750, y: 558, value: 0, max: 50 },
      {
        key: 'gridScreen-1',
        x: 551,
        y: 197,
        goal: { x: 50, y: 50 },
        width: 300,
        height: 300,
        resolution: 100,
      },
    ],
    connections: [
      'toggle-1.value:gridScreen-1.x',
      'toggle-2.value:gridScreen-1.y',
    ],
  },
  {
    components: [
      { key: 'knob-1', x: 643, y: 539, value: 50, max: 100 },
      {
        key: 'waveScreen-1',
        x: 405,
        y: 138,
        goal: { amplitude: 10, wavelength: 40.33 },
        amplitude: 50,
        wavelength: 40.33,
        width: 590,
        height: 300,
      },
    ],
    connections: ['knob-1.value:waveScreen-1.amplitude'],
  },

  {
    components: [
      { key: 'knob-1', x: 424, y: 536, value: 30, min: 20, max: 35 },
      { key: 'knob-2', x: 566, y: 537, value: -5, min: -15, max: -5 },
      { key: 'knob-3', x: 727, y: 539, value: 30, min: 20, max: 35 },
      { key: 'knob-4', x: 895, y: 540, value: -5, min: -15, max: -5 },
      {
        key: 'waveScreen-1',
        x: 405,
        y: 138,
        goal: { amplitude: 20.07, wavelength: 40.33 },
        amplitude: 40,
        wavelength: 40.33,
        width: 590,
        height: 300,
      },
    ],
    connections: [
      'knob-1.value:waveScreen-1.amplitude',
      'knob-2.value:waveScreen-1.amplitude',
      'knob-3.value:waveScreen-1.amplitude',
      'knob-4.value:waveScreen-1.amplitude',
    ],
  },
  {
    components: [
      { key: 'knob-1', x: 467, y: 489, max: 100 },
      { key: 'knob-2', x: 785, y: 502, value: 23.145833333333332, max: 100 },
      {
        key: 'waveScreen-1',
        x: 393,
        y: 129,
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
    components: [
      { key: 'toggle-1', x: 1012, y: 168, value: 6, max: 6 },
      { key: 'toggle-2', x: 421, y: 173, max: 12 },
      { key: 'toggle-3', x: 1012, y: 273, max: 24 },
      { key: 'toggle-4', x: 419, y: 279, value: 48, max: 48 },
      { key: 'toggle-5', x: 1012, y: 384, max: 6 },
      { key: 'toggle-6', x: 420, y: 393, value: 12, max: 12 },
      { key: 'toggle-7', x: 1011, y: 507, max: 24 },
      { key: 'toggle-8', x: 417, y: 506, max: 48 },
      {
        key: 'gridScreen-1',
        x: 535,
        y: 164,
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
      { key: 'knob-1', x: 507, y: 528, value: 39, max: 100 },
      { key: 'knob-2', x: 854, y: 530, value: 60, max: 100 },
      {
        key: 'gridScreen-1',
        x: 419,
        y: 174,
        isValid: false,
        goal: { x: 50, y: 50 },
        width: 590,
        height: 300,
        resolution: 40,
      },
    ],
    connections: ['knob-1.value:gridScreen-1.x', 'knob-2.value:gridScreen-1.y'],
  },
  {
    components: [
      { key: 'knob-1', x: 492, y: 482, max: 100 },
      { key: 'knob-2', x: 667, y: 482, max: 100 },
      { key: 'knob-3', x: 841, y: 479, max: 100 },
      { key: 'numberScreen-1', x: 601, y: 225, value: 456, goal: {} },
    ],
    connections: [
      'knob-1.value:numberScreen-1.value.0',
      'knob-2.value:numberScreen-1.value.1',
      'knob-3.value:numberScreen-1.value.2',
    ],
  },
]

// prettier-ignore
export const MUSIC = [
  [[[.5,0,120,1.5,,2.5,,,-.001,,3,,,,,,,,,1]],[[[,-1,18,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],[,1,,,,,,,,,23,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],[,-1,,,,,,,,,,,,,,,,,22,,,,,,,,,,,,,,,,,,,,,,,,],[,1,,,,,,,,,,,,,,,,,,,,,,,,,12,,,,,,,,,,,,,,,,]]],[0],50,{"title":"New Song","instruments":["Synth Wave"],"patterns":["Pattern 0"]}]
]

// prettier-ignore
export const CLICK_SOUND = [,,,,.01,,,,.1,,,,.01]

// prettier-ignore
export const WIN_SOUND = [,0,0,.24,.3,.3,3,0,,,4,.01,.02,,1,,.04,.7,.09,.4]

// prettier-ignore
export const LEVEL_SOUND = [,0,-70,.24,.6,.3,3,0,,,.6,.01,.04,,10,,.55,.7,.04,.35]

// prettier-ignore
export const GAME_OVER_SOUND =[,,300,.04,3,.53,1,1.35,,,34,.06,.01,.1,,,.14,.63,.11]
