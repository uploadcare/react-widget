const path = require("path");
const webpack = require("webpack");

let config = {
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client",
    "./client/index.js"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel",
      exclude: /(node_modules)/,
      query: {
        presets: ["react", "react-hmre"]
      }
    }]
  }
};

module.exports = config;
