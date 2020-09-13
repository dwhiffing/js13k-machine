// TODO: need to make levels more compact
// prettier-ignore
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
      { key: 'toggle-1', x: 1012, y: 168, max: 6 },
      { key: 'toggle-2', x: 421, y: 173, max: 12 },
      { key: 'toggle-3', x: 1012, y: 273, max: 24 },
      { key: 'toggle-4', x: 419, y: 279, max: 48 },
      { key: 'toggle-5', x: 1012, y: 384, max: 6 },
      { key: 'toggle-6', x: 420, y: 393, max: 12 },
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
      { key: 'knob-1', x: 417, y: 588, value: 150, min: 90, max: 150 },
      { key: 'knob-2', x: 564, y: 585, value: 10, min: -25, max: 10 },
      {
        key: 'knob-3',
        x: 725,
        y: 584,
        value: -5.4109570312500015,
        min: -25,
        max: 10,
      },
      { key: 'knob-4', x: 890, y: 583, value: 10, min: -25, max: 10 },
      { key: 'toggle-1', x: 1076, y: 427, max: 10 },
      { key: 'toggle-2', x: 282, y: 435, max: 40 },
      { key: 'toggle-3', x: 278, y: 347, max: 100 },
      { key: 'toggle-4', x: 284, y: 163, max: 20 },
      { key: 'toggle-5', x: 282, y: 249, value: 30, max: 30 },
      { key: 'toggle-6', x: 1075, y: 339, max: 50 },
      { key: 'toggle-7', x: 1067, y: 158, max: -30 },
      { key: 'toggle-8', x: 1074, y: 243, max: -90 },
      {
        key: 'waveScreen-1',
        x: 405,
        y: 138,
        goal: { amplitude: 20.07, wavelength: 40.33 },
        isValid: false,
        amplitude: 100,
        wavelength: 30,
        width: 590,
        height: 300,
      },
    ],
    connections: [
      'knob-1.value:waveScreen-1.amplitude',
      'knob-2.value:waveScreen-1.amplitude',
      'knob-3.value:waveScreen-1.amplitude',
      'knob-4.value:waveScreen-1.amplitude',
      'toggle-1.value:waveScreen-1.wavelength',
      'toggle-2.value:waveScreen-1.wavelength',
      'toggle-3.value:waveScreen-1.wavelength',
      'toggle-4.value:waveScreen-1.wavelength',
      'toggle-5.value:waveScreen-1.wavelength',
      'toggle-6.value:waveScreen-1.wavelength',
      'toggle-7.value:waveScreen-1.wavelength',
      'toggle-8.value:waveScreen-1.wavelength',
    ],
  },

  {
    components: [
      { key: 'toggle-1', x: 1100, y: 431, max: 1 },
      { key: 'speaker-1', x: 213, y: 67, max: 100 },
      { key: 'toggle-2', x: 1245, y: 288, max: 2 },
      { key: 'speaker-2', x: 325, y: 70, max: 100 },
      { key: 'toggle-3', x: 395, y: 282, max: 3 },
      { key: 'speaker-3', x: 442, y: 70, max: 100 },
      { key: 'toggle-4', x: 275, y: 425, max: 4 },
      { key: 'speaker-4', x: 559, y: 71, max: 100 },
      { key: 'toggle-5', x: 394, y: 577, max: 5 },
      { key: 'speaker-5', x: 678, y: 71, max: 100 },
      { key: 'toggle-6', x: 1239, y: 595, max: 6 },
      { key: 'speaker-6', x: 797, y: 73, max: 100 },
      { key: 'toggle-7', x: 974, y: 601, max: 7 },
      { key: 'speaker-7', x: 917, y: 77, max: 100 },
      { key: 'toggle-8', x: 272, y: 290, max: 8 },
      { key: 'speaker-8', x: 1047, y: 76, max: 100 },
      { key: 'toggle-9', x: 969, y: 292, max: 9 },
      { key: 'speaker-9', x: 1173, y: 74, max: 100 },
      {
        key: 'gridScreen-1',
        x: 520,
        y: 276,
        goal: { x: 30, y: 80 },
        width: 400,
        height: 400,
        resolution: 40,
      },
      { key: 'toggle-10', x: 1100, y: 288, max: 10 },
      { key: 'toggle-11', x: 978, y: 433, max: 10 },
      { key: 'toggle-12', x: 1246, y: 424, max: 20 },
      { key: 'toggle-13', x: 1104, y: 598, max: 30 },
      { key: 'toggle-14', x: 396, y: 425, max: 10 },
      { key: 'toggle-15', x: 154, y: 290, max: 10 },
      { key: 'toggle-16', x: 155, y: 429, max: 20 },
      { key: 'toggle-17', x: 158, y: 570, max: 20 },
      { key: 'toggle-18', x: 278, y: 573, max: 30 },
    ],
    connections: [
      'toggle-1.value:speaker-1.value',
      'toggle-2.value:speaker-2.value',
      'toggle-3.value:speaker-3.value',
      'toggle-4.value:speaker-4.value',
      'toggle-5.value:speaker-5.value',
      'toggle-6.value:speaker-6.value',
      'toggle-7.value:speaker-7.value',
      'toggle-8.value:speaker-8.value',
      'toggle-9.value:speaker-9.value',
      'toggle-10.value:gridScreen-1.x',
      'toggle-11.value:gridScreen-1.x',
      'toggle-12.value:gridScreen-1.x',
      'toggle-13.value:gridScreen-1.x',
      'toggle-14.value:gridScreen-1.y',
      'toggle-15.value:gridScreen-1.y',
      'toggle-16.value:gridScreen-1.y',
      'toggle-17.value:gridScreen-1.y',
      'toggle-18.value:gridScreen-1.y',
    ],
  },
  {
    components: [
      { key: 'toggle-1', x: 498, y: 284, max: 3 },
      { key: 'speaker-1', x: 479, y: 107, max: 100 },
      { key: 'toggle-2', x: 664, y: 281, max: 9 },
      { key: 'speaker-2', x: 656, y: 106, max: 100 },
      { key: 'toggle-3', x: 851, y: 291, max: 2 },
      { key: 'speaker-3', x: 838, y: 112, max: 100 },
      {
        key: 'numberScreen-1',
        x: 605,
        y: 399,
        value: [0, 0, 0],
        goal: [3,9,2],
      },
      { key: 'knob-1', x: 488, y: 638, max: 100 },
      { key: 'knob-2', x: 654, y: 639, max: 100 },
      { key: 'knob-3', x: 834, y: 643, max: 100 },
    ],
    connections: [
      'toggle-1.value:speaker-1.value',
      'toggle-2.value:speaker-2.value',
      'toggle-3.value:speaker-3.value',
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
export const KNOB_SOUND = [,,167,,,0.08,,2.96,,,171,0.35,,0.1,-5,,,0.1,0.03,]

// prettier-ignore
export const CLICK_SOUND = [,,,,.01,,,,.1,,,,.01]

// prettier-ignore
export const WIN_SOUND = [,0,0,.24,.3,.3,3,0,,,4,.01,.02,,1,,.04,.7,.09,.4]

// prettier-ignore
export const LEVEL_SOUND = [,0,-70,.24,.6,.3,3,0,,,.6,.01,.04,,10,,.55,.7,.04,.35]

// prettier-ignore
export const GAME_OVER_SOUND =[,,300,.04,3,.53,1,1.35,,,34,.06,.01,.1,,,.14,.63,.11]
