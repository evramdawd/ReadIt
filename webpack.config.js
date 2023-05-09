const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.NODE_ENV,
  entry: {
    index: './client/index.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/build',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { 
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i, 
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
};