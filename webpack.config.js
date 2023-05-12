const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './client/index.js'
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/build',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    proxy: {
      '/api/**': 'http://localhost:3000',
      '/load': 'http://localhost:3000',
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, 
        exclude: /node_modules/, // put parenthesis around node modules like google_doc? /(node_modules)/
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
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html'
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  }
};