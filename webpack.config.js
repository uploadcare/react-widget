const config = require('./webpack.base.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

config.module = {
  loaders: [{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /(node_modules)/,
  }],
}

config.plugins.push(new UglifyJsPlugin())

module.exports = config
