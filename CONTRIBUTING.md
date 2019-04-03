## Contributing

Recommendations and requirements for how to best contribute to **react-vega**. As always, thanks for contributing, and we hope these guidelines make it easier and shed some light on our approach and processes.

#### Key branches

- `master` is the latest released version

### Development

#### Run

To run in development mode

```
npm run storybook
```

<!-- ### Test

Run this command to test once.

```
npm test
```

Or run this command to test and retest when files are changed.

```
npm run tdd
``` -->

#### Committing

The commit message should be conventional commit. Can use this command line utility to help.

```bash
npm run commit
```

### Publishing

#### Versioning

**react-vega** comforms to the [Semantic Versioning](http://semver.org/) standard.

```bash
npm run build
# Choose from one of these
npm version patch
npm version minor
npm version major
# Check package version and size.
# If everything looks good, then publish
npm publish
```

#### Deploy Storybook to github pages

```bash
npm run gh-pages
```

### License

By contributing your code, you agree to license your contributions under the terms of the [Apache-2.0 license](https://github.com/kristw/react-vega/blob/master/LICENSE)