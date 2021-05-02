module.exports = async ({ config }) => {
  config.module.rules.push({
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'entry',
          corejs: { version: 3, proposals: true }
        }],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
      ],
    },
    test: /\.tsx?$/,
    exclude: /node_modules/,
  });
  config.module.rules.push({
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'entry',
          corejs: { version: 3, proposals: true }
        }],
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-syntax-optional-chaining'
      ],
    },
    test: /vega\-lite\/build\/src\/(.*\/)*.*(\..*)?\.js/,
    exclude: /node_modules\/(?!(vega-lite))/
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
