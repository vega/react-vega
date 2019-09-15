## Contributing

Recommendations and requirements for how to best contribute to **react-vega**. As always, thanks for contributing, and we hope these guidelines make it easier and shed some light on our approach and processes.

#### Key branches

- `master` is the latest released version


### File organization

[lerna](https://github.com/lerna/lerna/) is used to manage versions and dependencies between
packages in this monorepo.

Each package can inherit settings from project root and override its own build config, linting, and testing via beemo. You run all commands from root of the project except storybook.

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

### Development

#### Run storybook

```sh
cd packages/react-vega-demo
yarn storybook
```

### Testing

Run this command to test once.

```sh
yarn test
```

Or run this command to test and retest when files are changed.

```sh
yarn test:watch
```

### Linting

```sh
yarn lint
# or this one if you want eslint to fix automatically when possible.
yarn lint:fix
```

### Committing

This repository follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) guideline for commit messages and has a `commitlint` hook which will require you to have the valid commit message before committing.

You can use `yarn commit` to help you create a commit message.


### Publishing

**Prerequisite:** You'll need an [npmjs.com](https://npmjs.com) account and given write access to `react-vega` and `react-vega-lite`.

1. Make sure you're logged in to NPM from your shell. Run `npm login` if necessary.
2. To make the release, run `yarn release` and follow the prompts.

#### Deploy Storybook to github pages

This is done automatically if you use `yarn release`.

```sh
yarn postrelease
```

### License

By contributing your code, you agree to license your contributions under the terms of the [Apache-2.0 license](https://github.com/kristw/react-vega/blob/master/LICENSE)
