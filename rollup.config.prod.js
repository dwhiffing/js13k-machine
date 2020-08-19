import kontra from 'rollup-plugin-kontra'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import html from 'rollup-plugin-html-bundle'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    kontra({}),
    commonjs(),
    nodeResolve(),
    terser(),
    html({
      template: 'index.html',
      target: 'dist/index.html',
      inline: true,
    }),
  ],
}
