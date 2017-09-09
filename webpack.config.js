const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const distFolder = "./dist";

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new CleanWebpackPlugin([distFolder]),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: distFolder
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, distFolder)
  }
};