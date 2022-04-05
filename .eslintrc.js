module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:react-hooks/recommended'],
  plugins: ['babel', 'compat', 'promise', 'prettier', 'react'],
  env: { browser: true },
  globals: { __DEV__: true },
  settings: {
    polyfills: ['promises'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.json'],
    'import/resolver': {
      webpack: {},
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] },
    },
    react: { version: 'detect' },
  },
  rules: {
    camelcase: ['error', { allow: ['^UNSAFE_'], properties: 'never' }],
    curly: 2,
    'import/extensions': [
      'error',
      {
        '.js': 'always',
        '.jsx': 'always',
        '.ts': 'always',
        '.tsx': 'always',
        '.json': 'always',
      },
    ],
    'prefer-object-spread': 1,
    'prefer-destructuring': ['error', { object: true, array: false }],
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
      ],
      plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'react'],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/ban-ts-comment': 0, // disabled temporarily
        '@typescript-eslint/ban-types': 0, // disabled temporarily
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-use-before-define': 1,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: false }],
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        'import/extensions': [
          'error',
          {
            '.ts': 'always',
            '.tsx': 'always',
            '.json': 'always',
          },
        ],
        'no-use-before-define': 0, // disabled temporarily
        'prettier/prettier': 'error',
        'react/destructuring-assignment': 0, // re-enable up for discussion
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-fragments': 1,
        'react/jsx-no-bind': 0,
        'react/jsx-no-literals': 'off',
        'react/jsx-props-no-spreading': 0, // re-enable up for discussion
        'react/require-default-props': 0,
        'react/sort-comp': 0,
        'react/static-property-placement': 0, // re-enable up for discussion
      },
      settings: {
        'import/resolver': {
          webpack: {},
          typescript: {},
        },
        react: { version: 'detect' },
      },
    },
    // STORYBOOK
    {
      files: ['*.stories.jsx', '*.stories.tsx', 'commitlint.config.js'],
      rules: {
        // this is to keep eslint from complaining about storybook addons,
        // since they are included as dev dependencies rather than direct dependencies.
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
    // TYPE DECLARATIONS
    {
      files: ['*.d.ts'],
      rules: {
        'max-classes-per-file': 0,
      },
    },
    // UNIT TESTS
    {
      files: ['*.test.ts', '*.test.tsx', '*.test.js', '*.test.jsx', 'fixtures.*'],
      plugins: ['jest', 'jest-dom', 'no-only-tests', 'testing-library'],
      env: { 'jest/globals': true },
      extends: ['plugin:jest/recommended', 'plugin:testing-library/react'],
      rules: {
        // This is to keep eslint from complaining about @testing-library imports,
        // since they are included as dev dependencies rather than direct dependencies.
        'import/no-extraneous-dependencies': 0,
        // Accessing container and nodes let us verify if vega renders svg correctly.
        'testing-library/no-container': 0,
        'testing-library/no-node-access': 0,
      },
    },
    // CONFIG FILES
    {
      files: ['webpack*.js', '.*rc.js', '*.config.js'],
      env: { node: true },
      settings: {
        'import/resolver': {
          node: {},
        },
      },
    },
  ],
};
