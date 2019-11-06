import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uploadcare from 'uploadcare-widget'

export default [
  // esm build width all locales
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

  // cjs build width all locales
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

  // esm build width en locale (30% smaller)
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
      replace({ 'uploadcare-widget': 'uploadcare-widget/uploadcare.lang.en' }),
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

  {
    input: 'src/langs.js',
    output: {
      format: 'esm',
      file: 'locales.js',
      sourcemap: false
    },
    plugins: [
      replace({ __LANGS__: JSON.stringify(uploadcare.locales) })
    ]
  }
]
