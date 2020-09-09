import kontra from 'rollup-plugin-kontra'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import html from 'rollup-plugin-html-bundle'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    kontra({ gameObject: { group: true } }),
    commonjs(),
    nodeResolve(),
    html({
      template: 'index.html',
      target: 'dist/index.html',
      inline: true,
    }),
    serve('dist'),
    livereload('dist'),
  ],
}
