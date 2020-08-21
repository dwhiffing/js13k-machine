const root = 6
export const LEVELS = [
  {
    components: [
      { key: 'toggle-1', x: 240, y: 550, max: root * 1 },
      { key: 'toggle-2', x: 340, y: 550, max: root * 2 },
      { key: 'toggle-3', x: 440, y: 550, max: root * 4 },
      { key: 'toggle-4', x: 540, y: 550, max: root * 8 },
      { key: 'toggle-5', x: 660, y: 150, max: root * 1 },
      { key: 'toggle-6', x: 660, y: 250, max: root * 2 },
      { key: 'toggle-7', x: 660, y: 350, max: root * 4 },
      { key: 'toggle-8', x: 660, y: 450, max: root * 8 },
      {
        key: 'screen-1',
        x: 220,
        y: 100,
        width: 400,
        height: 400,
        resolution: 24,
      },
    ],
    connections: [
      {
        input: { key: 'toggle-1', prop: 'value' },
        output: { key: 'screen-1', prop: 'x' },
      },
      {
        input: { key: 'toggle-2', prop: 'value' },
        output: { key: 'screen-1', prop: 'x' },
      },
      {
        input: { key: 'toggle-3', prop: 'value' },
        output: { key: 'screen-1', prop: 'x' },
      },
      {
        input: { key: 'toggle-4', prop: 'value' },
        output: { key: 'screen-1', prop: 'x' },
      },
      {
        input: { key: 'toggle-5', prop: 'value' },
        output: { key: 'screen-1', prop: 'y' },
      },
      {
        input: { key: 'toggle-6', prop: 'value' },
        output: { key: 'screen-1', prop: 'y' },
      },
      {
        input: { key: 'toggle-7', prop: 'value' },
        output: { key: 'screen-1', prop: 'y' },
      },
      {
        input: { key: 'toggle-8', prop: 'value' },
        output: { key: 'screen-1', prop: 'y' },
      },
    ],
  },
  {
    components: [
      { key: 'knob-1', x: 250, y: 450 },
      { key: 'knob-2', x: 450, y: 450 },
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
      { key: 'knob-1', x: 250, y: 450 },
      { key: 'knob-2', x: 450, y: 450 },
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
