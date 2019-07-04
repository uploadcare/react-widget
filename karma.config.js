const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    reporters: ['progress'],
    frameworks: ['mocha'],
    captureConsole: true,

    files: ['test/*.js'],

    plugins: [
      'karma-chrome-launcher',
      'karma-rollup-preprocessor',
      'karma-mocha'
    ],

    preprocessors: { 'test/*.js': ['rollup'] },
    rollupPreprocessor: {
      plugins: [
        replace({ 'process.env.NODE_ENV': process.env.NODE_ENV }),
        commonjs({
          include: 'node_modules/**',
          namedExports: {
            react: [
              'useState',
              'useEffect',
              'useLayoutEffect',
              'useCallback',
              'useMemo',
              'useRef',
              'Suspense',
              'lazy'
            ]
          }
        }),
        resolve({ preferBuiltins: false }),
        babel()
      ],
      output: {
        format: 'iife',
        name: 'uploadcare',
        sourcemap: false
      }
    }
  })
}
