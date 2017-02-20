module.exports = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loaders: "babel-loader",
  query: {
    presets: ["es2015", "react", "stage-2"]
  }
}, {
  test: /\.scss$/,
  loader: "style-loader!css-loader!sass-loader"
}, {
  test: /\.(png|jpg)$/,
  loader: "url-loader?limit=25000"
}];
