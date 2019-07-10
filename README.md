# react-vega & react-vega-lite

> `react` + `vega`|`vega-lite`

## Demo

http://vega.github.io/react-vega/

## Packages

Click on package name below to see its documentation.

| Package | Version |
|--|--|
| [react-vega](https://github.com/vega/react-vega/tree/master/packages/react-vega) | [![Version](https://img.shields.io/npm/v/react-vega.svg?style=flat-square)](https://img.shields.io/npm/v/react-vega.svg?style=flat-square) |
| [react-vega-lite](https://github.com/vega/react-vega/tree/master/packages/react-vega-lite) | [![Version](https://img.shields.io/npm/v/react-vega-lite.svg?style=flat-square)](https://img.shields.io/npm/v/react-vega-lite.svg?style=flat-square) |

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

### Builds, linting, and testing

Each package defines its own build config, linting, and testing. You can have lerna run commands
across all packages using the syntax `yarn test` (or `yarn test:watch` for watch mode) from the root directory.

### Committing

This repository follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) guideline for commit messages and has a `commitlint` hook which will require you to have the valid commit message before committing. You can use `yarn commit` to help you create a commit message.

### Publishing

**Prerequisite:** You'll need an [npmjs.com](https://npmjs.com) account and given write access to `react-vega` and `react-vega-lite`.

1. Make sure you're logged in to NPM from your shell. Run `npm login` if necessary.
2. To make the release, run `yarn release` and follow the prompts.

### License

Apache-2.0
