/* eslint comma-dangle: ["error",
 {"functions": "never", "arrays": "only-multiline", "objects":
 "only-multiline"} ] */

const webpack = require('webpack');
const pathLib = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'babel-polyfill',
    './app/bundles/Tabi/startup/registration',
  ],

  output: {
    filename: 'webpack-bundle.js',
    path: pathLib.resolve(__dirname, '../app/assets/webpack'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new ExtractTextPlugin("[name].css"),

  ],
  module: {
    rules: [
      {
        test: require.resolve('react'),
        use: {
          loader: 'imports-loader',
          options: {
            shim: 'es5-shim/es5-shim',
            sham: 'es5-shim/es5-sham',
          }
        },
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
    loaders: [
                // Extract css files
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
                },
                // Optionally extract less files
                // or any other compile-to-css language
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
                }
                // You could also use other loaders the same way. I. e. the autoprefixer-loader
            ],
  },
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
