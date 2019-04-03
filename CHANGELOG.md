<a name="6.0.0"></a>
# [6.0.0](https://github.com/vega/react-vega/compare/v5.0.0...v6.0.0) (2019-04-03)


### Bug Fixes

* linting ([669df11](https://github.com/vega/react-vega/commit/669df11))

### Features

* add storybook ([b4f1ecc](https://github.com/vega/react-vega/commit/b4f1ecc))


### BREAKING CHANGES

* output are now in `lib` and `esm` directories instead of `dist`
* discontinue `bower` support

<a name="5.0.0"></a>
# [5.0.0](https://github.com/vega/react-vega/compare/v4.0.2...v5.0.0) (2019-04-02)

- Switch from `vega-lib` back to `vega.

<a name="4.0.2"></a>
## [4.0.2](https://github.com/vega/react-vega/compare/v4.0.1...v4.0.2) (2018-07-31)

- Fix webpack config for amd/commonjs

<a name="4.0.1"></a>
## [4.0.1](https://github.com/vega/react-vega/compare/v4.0.0...v4.0.1) (2018-07-28)

- Fix wrong webpack config that cause `react-vega` to accidentally bundle `vega-lib` inside it. (Issue #20)

<a name="4.0.0"></a>
# [4.0.0](https://github.com/vega/react-vega/compare/v3.1.2...v4.0.0) (2018-07-25)

- Switch from `vega` to `vega-lib`
- Add tooltip handler support. Thanks @mdelrossi1.
- Fix bug #14

<a name="3.1.2"></a>
## [3.1.2](https://github.com/vega/react-vega/compare/v3.1.1...v3.1.2) (2018-01-11)

- Expand version to support React 16

<a name="3.1.1"></a>
## [3.1.1](https://github.com/vega/react-vega/compare/v3.1.0...v3.1.1) (2017-06-22)

- Also add `vega` to devDependencies

<a name="3.1.0"></a>
# [3.1.0](https://github.com/vega/react-vega/compare/v3.0.1...v3.1.0) (2017-06-22)

- Move `vega` to peerDependencies

<a name="3.0.1"></a>
## [3.0.1](https://github.com/vega/react-vega/compare/v3.0.0...v3.0.1) (2017-05-09)

<a name="3.0.0"></a>
# [3.0.0](https://github.com/vega/react-vega/compare/2.3.1...v3.0.0) (2017-05-09)

- Support Vega 3 API changes ([Issue #6](https://github.com/kristw/react-vega/issues/6))
- Remove props `viewport` from `Vega`

## 2.3.0
- Add props `updateOptions`

## 2.2.0
- Support props `className` and `style`

## 2.1.2
- Makes `createClassFromSpec(name, spec)` works when name is omitted (`createClassFromSpec(spec)`). This is for backward compatibility.

## 2.1.1
- Fix eslint complaints

## 2.1.0
- Implement `shouldComponentUpdate` to check if anything was changed.
- Add static functions `isSamePadding` and `isSameViewport` to `Vega` class.

# 2.0.0

**Very likely to work fine if you are upgrading from 1.x.x.**  There are breaking changes (of the features nobody seems to use) and I almost rewrite the whole thing so I think it is worth being considered a major version. Here are the list of changes:

- Rewrite using preferred method recommended by React. `Vega` component now extends `React.Component` and use `ref` as a function instead of string.
- Add check for props/data changes and only update when necessary.
- Refactor code for clarity
- Remove support for spec as a function
- Add static functions `isSameData`, `isSameSpec` and `listenerName` to `Vega` class.

## 1.1.1
- Fix bug to call `vis.update()` before setting new data

## 1.1.0
- Support function as data and add static `getSpec()`

## 1.0.1
- Avoid clearing data when that field is not set in the input.

# 1.0.0
- Change global export name to `ReactVega` instead of `reactVega`

## 0.1.2
- Fix bug with umd export when using global

## 0.1.1
- Fix bug with umd export when using global

## 0.1.0
- Add support for dynamic spec via `<Vega>` component.

## 0.0.2
- Fix external lib bug

## 0.0.1
- First release