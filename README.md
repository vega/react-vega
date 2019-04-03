# @superset-ui

[![Codecov branch](https://img.shields.io/codecov/c/github/apache-superset/superset-ui/master.svg?style=flat-square)](http://codecov.io/github/apache-superset/superset-ui/coverage.svg?branch=master)
[![Build Status](https://img.shields.io/travis/com/apache-superset/superset-ui/master.svg?style=flat-square
)](https://travis-ci.com/apache-superset/superset-ui)
[![David](https://img.shields.io/david/dev/apache-superset/superset-ui.svg?style=flat-square)](https://david-dm.org/apache-superset/superset-ui?type=dev)

> `react` + `vega`|`vega-lite`

## Packages

| Package | Version |
|--|--|
| [react-vega](https://github.com/vega/react-vega/tree/master/packages/react-vega) | [![Version](https://img.shields.io/npm/v/react-vega.svg?style=flat-square)](https://img.shields.io/npm/v/react-vega.svg?style=flat-square) |
| [react-vega-lite](https://github.com/vega/react-vega-lite/tree/master/packages/react-vega-lite) | [![Version](https://img.shields.io/npm/v/react-vega-lite.svg?style=flat-square)](https://img.shields.io/npm/v/react-vega-lite.svg?style=flat-square) |

### Development

[lerna](https://github.com/lerna/lerna/) is used to manage versions and dependencies between
packages in this monorepo.

```
react-vega/
  lerna.json
  package.json
  ...
  packages/
    package1/
      package.json
      ...
      src/
      test/
      ...
      lib/
      esm/
      ...
    ...
```

### Installation

1. clone this repo
2. have `yarn install` package dependencies and manage the symlinking between packages for you

```sh
git clone ...superset-ui && cd superset-ui
yarn install
```

### Builds, linting, and testing

Each package defines its own build config, linting, and testing. You can have lerna run commands
across all packages using the syntax `yarn run test` (or `yarn run test:watch` for watch mode) from the root directory.

### Committing

This repository follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) guideline for commit messages and has a `commitlint` hook which will require you to have the valid commit message before committing. You can use `npm run commit` to help you create a commit message.

### Publishing

**Prerequisite:** You'll need an [npmjs.com](https://npmjs.com) account and given write access to `react-vega` and `react-vega-lite`.

1. Make sure you're logged in to NPM from your shell. Run `npm login` if necessary.
2. To make the release, run `yarn run release` and follow the prompts.

### License

Apache-2.0
