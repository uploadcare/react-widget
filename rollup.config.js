import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import replacement from 'rollup-plugin-module-replacement'
import { terser } from 'rollup-plugin-terser'

import uploadcare from 'uploadcare-widget'

const bundleConfig = ({format, dir, minify, widgetBundle}) => {
  const extension = format === 'cjs' ? 'cjs' : 'mjs'
  return {
    input: 'src/index.js',
    external: [
      'react',
      'react-fast-compare',
      'uploadcare-widget',
      '@uploadcare/client-suspense'
    ],
    output: {
      entryFileNames: `[name].${extension}`,
      chunkFileNames: `[name]-[hash].${extension}`,
      format,
      dir,
      sourcemap: false
    },
    plugins: [
      widgetBundle && replacement({
        entries: [
          {
            find: 'uploadcare-widget',
            replacement: `uploadcare-widget/${widgetBundle}`
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
      minify && terser()
    ].filter(Boolean)
  }
}

export default [
  // esm build with all locales
  bundleConfig({format: 'esm', dir: 'dist/esm'}),

  // cjs build with all locales
  bundleConfig({format: 'cjs', dir: 'dist/cjs'}),

  // minified builds with all locales
  // Saves ~13 KB on react-widget and ~227 KB on uploadcare-widget
  bundleConfig({format: 'cjs', dir: 'dist/cjs-min', widgetBundle: 'uploadcare.min.js', minify: true}),
  bundleConfig({format: 'esm', dir: 'dist/esm-min', widgetBundle: 'uploadcare.min.js', minify: true}),

  // builds with en locale only (saves ~147 KB on uploadcare-widget)
  bundleConfig({format: 'esm', dir: 'dist/esm-en', widgetBundle: 'uploadcare.lang.en.js'}),
  bundleConfig({format: 'cjs', dir: 'dist/cjs-en', widgetBundle: 'uploadcare.lang.en.js'}),

  // minified builds with en locale only
  // Saves ~13 KB on react-widget and ~314 KB on uploadcare-widget
  bundleConfig({format: 'esm', dir: 'dist/esm-en-min', widgetBundle: 'uploadcare.lang.en.min.js', minify: true}),
  bundleConfig({format: 'cjs', dir: 'dist/cjs-en-min', widgetBundle: 'uploadcare.lang.en.min.js', minify: true}),

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
