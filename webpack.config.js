var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      }
    ]
  },
  noInfo: true,
  devServer: {
    contentBase: './dist',
    hot: true,
    noInfo: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './client/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
