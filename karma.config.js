const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')

const react = require('react')
const testUtils = require('react-dom/test-utils')

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
    rollupPreprocessor: rollupConfig()
  })
}

const rollupConfig = () => ({
  output: {
    format: 'iife',
    name: 'uploadcare',
    sourcemap: false
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env': '({})'
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react),
        'react-dom/test-utils': Object.keys(testUtils)
      }
    }),
    resolve({ preferBuiltins: false }),
    babel()
  ]
})
