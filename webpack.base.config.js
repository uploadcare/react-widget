const path = require("path");
const webpack = require("webpack");

const USE_SOURCE = !!~process.argv.indexOf("--source");

let config = {
  entry: [
    "./client/index.js"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: []
};

if(USE_SOURCE) {
  const PATH_TO_UPLOADCARE_WIDGET = process.env.PATH_TO_UPLOADCARE_WIDGET || "..";
  
  config.resolve = {
    alias: {
      "uploadcare-widget": path.join(PATH_TO_UPLOADCARE_WIDGET, "uploadcare-widget", "pkg", "latest", "uploadcare.min.js"),
      "jquery": path.join(__dirname, "node_modules", "jquery", "dist", "jquery.min.js")
    }
  };
}

module.exports = config;
