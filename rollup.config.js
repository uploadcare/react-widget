import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import replacement from 'rollup-plugin-module-replacement'
import { terser } from 'rollup-plugin-terser'

import uploadcare from 'uploadcare-widget'

export default [
  // esm build with all locales
  {
    input: 'src/index.js',
    external: [
      'react',
      'react-fast-compare',
      'uploadcare-widget',
      '@uploadcare/client-suspense'
    ],
    output: {
      format: 'esm',
      dir: 'dist/esm',
      sourcemap: false
    },
    plugins: [
      commonjs({
        include: /node_modules/,
        sourceMap: false
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [['@babel/env', { modules: false }]]
      })
    ]
  },

  // cjs build with all locales
  {
    input: 'src/index.js',
    external: [
      'react',
      'react-fast-compare',
      'uploadcare-widget',
      '@uploadcare/client-suspense'
    ],
    output: {
      format: 'cjs',
      dir: 'dist/cjs',
      sourcemap: false
    },
    plugins: [
      commonjs({
        include: /node_modules/,
        sourceMap: false
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [['@babel/env', { modules: false }]]
      })
    ]
  },

  // minified esm build with all locales
  // Saves ~13 KB on react-widget and ~227 KB on uploadcare-widget
  {
    input: 'src/index.js',
    external: [
      'react',
      'react-fast-compare',
      'uploadcare-widget/uploadcare.min',
      '@uploadcare/client-suspense'
    ],
    output: {
      format: 'esm',
      dir: 'min',
      sourcemap: false
    },
    plugins: [
      replacement({
        entries: [
          {
            find: 'uploadcare-widget',
            replacement: 'uploadcare-widget/uploadcare.min'
          }
        ]
      }),
      commonjs({
        include: /node_modules/,
        sourceMap: false
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [['@babel/env', { modules: false }]]
      }),
      terser()
    ]
  },

  // esm build with en locale only (saves ~147 KB on uploadcare-widget)
  {
    input: 'src/index.js',
    external: [
      'react',
      'react-fast-compare',
      'uploadcare-widget/uploadcare.lang.en',
      '@uploadcare/client-suspense'
    ],
    output: {
      format: 'esm',
      dir: 'en',
      sourcemap: false
    },
    plugins: [
      replacement({
        entries: [
          {
            find: 'uploadcare-widget',
            replacement: 'uploadcare-widget/uploadcare.lang.en'
          }
        ]
      }),
      commonjs({
        include: /node_modules/,
        sourceMap: false
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [['@babel/env', { modules: false }]]
      })
    ]
  },

  // minified esm build with en locale only
  // Saves ~13 KB on react-widget and ~314 KB on uploadcare-widget
  {
    input: 'src/index.js',
    external: [
      'react',
      'react-fast-compare',
      'uploadcare-widget/uploadcare.lang.en.min',
      '@uploadcare/client-suspense'
    ],
    output: {
      format: 'esm',
      dir: 'en-min',
      sourcemap: false
    },
    plugins: [
      replacement({
        entries: [
          {
            find: 'uploadcare-widget',
            replacement: 'uploadcare-widget/uploadcare.lang.en.min'
          }
        ]
      }),
      commonjs({
        include: /node_modules/,
        sourceMap: false
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [['@babel/env', { modules: false }]]
      }),
      terser()
    ]
  },

  {
    input: 'src/langs.js',
    output: {
      format: 'esm',
      file: 'locales.js',
      sourcemap: false
    },
    plugins: [
      replace({
        __LANGS__: JSON.stringify(uploadcare.locales),
        preventAssignment: true
      })
    ]
  }
]
