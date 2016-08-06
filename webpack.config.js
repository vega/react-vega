'use strict';

var webpack = require('webpack');

module.exports = function(){
  return {
    module:{
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['react', 'es2015'],
            plugins: ['transform-object-assign']
          }
        }
      ],
    },
    plugins: []
  };
};