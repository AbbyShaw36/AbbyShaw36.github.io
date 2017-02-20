var webpack = require("webpack");
var loaders = require("./webpack.loaders");

module.exports = {
  entry: __dirname + "/src/main.jsx",
  output: {
    path: __dirname + "/app",
    filename: "bundle.js"
  },
  module: {
    loaders: loaders
  }
};
