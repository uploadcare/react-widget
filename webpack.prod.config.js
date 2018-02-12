const merge = require('webpack-merge')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  plugins: [
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
  ],
})
