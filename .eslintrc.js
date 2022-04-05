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
  env: {
    browser: true,
  },
  globals: {
    __DEV__: true,
  },
  settings: {
    polyfills: ['promises'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.json'],
    'import/resolver': {
      webpack: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    camelcase: [
      'error',
      {
        allow: ['^UNSAFE_'],
        properties: 'never',
      },
    ],
    curly: 2,
    'class-methods-use-this': 0,
    'func-names': 0,
    'guard-for-in': 0,
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
    indent: 0,
    'no-bitwise': 0,
    'no-continue': 0,
    'no-mixed-operators': 0,
    'no-multi-assign': 0,
    'no-multi-spaces': 0,
    'no-nested-ternary': 0,
    'no-prototype-builtins': 0,
    'no-restricted-properties': 0,
    'padded-blocks': 0,
    'prefer-arrow-callback': 0,
    'prefer-object-spread': 1,
    'prefer-destructuring': ['error', { object: true, array: false }],
    'react/destructuring-assignment': 0, // re-enable up for discussion
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-fragments': 1,
    'react/jsx-no-bind': 0,
    'react/jsx-props-no-spreading': 0, // re-enable up for discussion
    'react/no-array-index-key': 0,
    'react/no-string-refs': 0,
    'react/no-unescaped-entities': 0,
    'react/no-unused-prop-types': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/static-property-placement': 0, // disabled temporarily
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
        '@typescript-eslint/no-non-null-assertion': 0, // disabled temporarily
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0, // re-enable up for discussion
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        camelcase: 0,
        'class-methods-use-this': 0,
        'func-names': 0,
        'guard-for-in': 0,
        'import/extensions': [
          'error',
          {
            '.ts': 'always',
            '.tsx': 'always',
            '.json': 'always',
          },
        ],
        'import/no-named-as-default-member': 0,
        indent: 0,
        'new-cap': 0,
        'no-bitwise': 0,
        'no-continue': 0,
        'no-mixed-operators': 0,
        'no-multi-assign': 0,
        'no-multi-spaces': 0,
        'no-nested-ternary': 0,
        'no-prototype-builtins': 0,
        'no-restricted-properties': 0,
        'no-use-before-define': 0, // disabled temporarily
        'padded-blocks': 0,
        'react/destructuring-assignment': 0, // re-enable up for discussion
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-fragments': 1,
        'react/jsx-no-bind': 0,
        'react/jsx-props-no-spreading': 0, // re-enable up for discussion
        'react/no-array-index-key': 0,
        'react/no-string-refs': 0,
        'react/no-unescaped-entities': 0,
        'react/no-unused-prop-types': 0,
        'react/prop-types': 0,
        'react/require-default-props': 0,
        'react/static-property-placement': 0, // re-enable up for discussion
        'react/sort-comp': 0,
        'prettier/prettier': 'error',
        'react/jsx-no-literals': 'off',
        '@typescript-eslint/no-explicit-any': [
          'warn',
          {
            fixToUnknown: false,
          },
        ],
      },
      settings: {
        'import/resolver': {
          webpack: {},
          typescript: {},
        },
        react: {
          version: 'detect',
        },
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
      env: {
        'jest/globals': true,
      },
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
      env: {
        node: true,
      },
      settings: {
        'import/resolver': {
          node: {},
        },
      },
    },
  ],
};
