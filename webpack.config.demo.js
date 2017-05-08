const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = {
  entry: [
    './demo/src/main.js',
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'demo/dist'),
  },
};

let config;
if (process.env.NODE_ENV === 'production') {
  // Production config
  const prodConfig = require('lazynerd-devtools/config/webpack/webpack.config.prod.js');
  config = merge(prodConfig, commonConfig);
} else {
  // Development config
  const devConfig = require('lazynerd-devtools/config/webpack/webpack.config.dev.js');
  config = merge(devConfig, commonConfig);
}

config.plugins.splice(0, 1);

config.plugins.push(
  new HtmlWebpackPlugin({
    template: 'demo/src/index.ejs',
  })
);

module.exports = config;
