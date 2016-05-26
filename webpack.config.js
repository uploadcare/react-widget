const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.base.config");

config.module = {
  loaders: [{
    test: /\.js$/,
    loader: "babel",
    exclude: /(node_modules)/,
    query: {
      presets: ["react"]
    }
  }]
};

module.exports = config;
