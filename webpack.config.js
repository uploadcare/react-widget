const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.base.config");

config.module = {
  loaders: [{
    test: /\.js$/,
    loader: "babel",
    exclude: /(node_modules)/,
    query: {
      presets: ["stage-0", "react"]
    }
  }]
};

module.exports = config;
