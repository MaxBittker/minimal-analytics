import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'sa.js',
  dest: 'ma.min.js',
  format: 'iife',
  sourceMap: 'none',
  plugins: [
    uglify(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      namedExports: {
        'node-uuid': [ 'v4' ],
        'js-cookie': [ 'get','set' ],

      }}
    ),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
