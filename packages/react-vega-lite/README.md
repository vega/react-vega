<!--**Introduction**-->
<!--| [API Reference](https://github.com/kristw/react-vega-lite/blob/master/docs/api.md)-->
<!--| [Demo](https://kristw.github.io/react-vega-lite)-->

# react-vega-lite [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

<!--[![Build Status][travis-image]][travis-url]-->

Convert Vega Lite spec into React class conveniently, inspired by this [tutorial](https://medium.com/@pbesh/react-and-vega-an-alternative-visualization-example-cd76e07dc1cd#.omslw1xy8) by @pbeshai

`react-vega-lite: 1.x.x` was update with breaking changes to support Vega-Lite 2.0, which is still in beta.
If you are looking to use React with Vega Lite 1.x, please use `react-vega-lite: 0.0.1`.

## Examples

- http://vega.github.io/react-vega-lite/

## Install

```bash
npm install vega vega-lite react-vega react-vega-lite --save
```

## Example code

There are two approaches to use this libary.

### Approach#1 Create class from spec, then get a React class to use

#### BarChart.js

```javascript
import React, { PropTypes } from 'react';
import {createClassFromLiteSpec} from 'react-vega-lite';

export default createClassFromLiteSpec('BarChart', {
  "description": "A simple bar chart with embedded data.",
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
});
```

#### main.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './BarChart.js';

const barData = {
  "values": [
    {"a": "A","b": 20}, {"a": "B","b": 34}, {"a": "C","b": 55},
    {"a": "D","b": 19}, {"a": "E","b": 40}, {"a": "F","b": 34},
    {"a": "G","b": 91}, {"a": "H","b": 78}, {"a": "I","b": 25}
  ]
};

ReactDOM.render(
  <BarChart data={barData} />,
  document.getElementById('bar-container')
);
```

### Approach#2 Use `<VegaLite>` generic class and pass in `spec` for dynamic component.

Provides a bit more flexibility, but at the cost of extra checks for spec changes.

#### main.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import VegaLite from 'react-vega-lite';

const spec = {
  "description": "A simple bar chart with embedded data.",
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
};

const barData = {
  "values": [
    {"a": "A","b": 20}, {"a": "B","b": 34}, {"a": "C","b": 55},
    {"a": "D","b": 19}, {"a": "E","b": 40}, {"a": "F","b": 34},
    {"a": "G","b": 91}, {"a": "H","b": 78}, {"a": "I","b": 25}
  ]
};

ReactDOM.render(
  <VegaLite spec={spec} data={barData} />,
  document.getElementById('bar-container')
);
```

### Props

React class `VegaLite` and any output class from `createClassFromLiteSpec` have these properties:

- **className**:String
- **style**:Object

- **width**:Number
- **height**:Number
- **padding**:Object
- **renderer**:String
- **logLevel**:Number
- **background**:String
- **enableHover**:Boolean

- **data**:Object

- **onSignal***XXX*

- **onNewView**
- **onParseError**

which are the same with `react-vega`. Please refer to [react-vega documentation](https://github.com/kristw/react-vega#props).

### Static function

Any class created from `createClassFromLiteSpec` will have this function.

- Chart.**getSpec()** - return `spec`

## Frequently Asked Questions

### How to use Vega Tooltip?

You can pass the [`vega-tooltip`](https://github.com/vega/vega-tooltip) handler instance to the `tooltip` property.

```javascript
import { Handler } from 'vega-tooltip';

 <VegaLite spec={spec} data={barData} tooltip={new Handler().call} />
```

[npm-image]: https://badge.fury.io/js/react-vega-lite.svg
[npm-url]: https://npmjs.org/package/react-vega-lite
[travis-image]: https://travis-ci.org/kristw/react-vega-lite.svg?branch=master
[travis-url]: https://travis-ci.org/kristw/react-vega-lite
[daviddm-image]: https://david-dm.org/kristw/react-vega-lite.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kristw/react-vega-lite
