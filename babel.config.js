const isEsm = process.env.BABEL_OUTPUT === 'esm';

const envOptions = {
  loose: true,
  modules: isEsm ? false : 'commonjs',
  shippedProposals: true,
  targets: false,
  bugfixes: false,
};

const config = {
  ignore: [
    'coverage/',
    'node_modules/',
    'public/',
    'esm/',
    'lib/',
    'tmp/',
    'dist/',
    '*.d.ts',
    '__tests__',
    '__mocks__',
  ],
  plugins: [
    [
      'babel-plugin-transform-dev',
      {
        evaluate: false,
      },
    ],
    'babel-plugin-typescript-to-proptypes',
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [['@babel/preset-env', envOptions], '@babel/preset-react', '@babel/preset-typescript'],
};

// Override to allow transpile es modules inside vega-lite
config.ignore = config.ignore.filter(item => item !== 'node_modules/');
config.ignore.push('node_modules/(?!(vega-lite|lodash-es))');

if (process.env.NODE_ENV === 'test') {
  envOptions.targets = { node: 'current' };
  config.plugins.push('babel-plugin-dynamic-import-node');
}

module.exports = config;
