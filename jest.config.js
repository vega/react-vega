module.exports = {
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules/', 'public/', 'esm/', 'lib/', 'tmp/', 'dist/'],
  coverageReporters: ['lcov'],
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  roots: ['<rootDir>/packages'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/?(*.)+(spec|test).{js,jsx,ts,tsx}'],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!vega-lite)'],
  verbose: true,
};
