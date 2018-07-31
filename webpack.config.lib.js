const path = require('path');
const merge = require('webpack-merge');

const commonConfig = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-vega.min.js',
    sourceMapFilename: '[file].map',
    library: 'ReactVega',
    libraryTarget: 'umd',
    umdNamedDefine: false
  },
  externals: {
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types'
    },
    'vega-lib': {
      root: 'vega',
      commonjs2: 'vega-lib',
      commonjs: 'vega-lib',
      amd: 'vega-lib'
    },
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }
};

let config;
const prodConfig = require('lazynerd-devtools/config/webpack/webpack.config.prod.js');
config = merge(prodConfig, commonConfig);
config.plugins = [];

module.exports = config;