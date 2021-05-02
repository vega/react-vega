module.exports = {
  ignore: [
    'coverage/',
    'node_modules/(?!(vega-lite))',
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
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-optional-chaining',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        shippedProposals: true,
        targets: false,
        bugfixes: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
