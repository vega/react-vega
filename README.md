<!--**Introduction**-->
<!--| [API Reference](https://github.com/kristw/react-vega/blob/master/docs/api.md)-->
<!--| [Demo](https://kristw.github.io/react-vega)-->

# react-vega [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

<!--[![Build Status][travis-image]][travis-url]-->

Convert Vega spec into React class conveniently, inspired by this [tutorial](https://medium.com/@pbesh/react-and-vega-an-alternative-visualization-example-cd76e07dc1cd#.omslw1xy8) by @pbeshai

## Versions

* `react-vega@6.x.x` is same with `5.x.x` but output are in different directories and exported as both `commonjs` and `es module`.
* `react-vega@5.x.x` uses `vega` again.
* `react-vega@4.x.x` has same interface with `3.x.x` except it uses the lightweight `vega-lib` instead of `vega`.
* `react-vega@3.x.x` was update with breaking changes to support `vega@3.0`.
* If you are looking to use `react` with `vega@2.x`, please use `react-vega@2.3.1`.

## Examples

- http://vega.github.io/react-vega/

## Install

```bash
npm install react vega react-vega --save
```

## Example code

There are two approaches to use this library.

### Approach#1 Create class from spec, then get a React class to use

#### BarChart.js

See the rest of the spec in [spec1.js](demo/src/vega/spec1.js).

```javascript
import React, { PropTypes } from 'react';
import {createClassFromSpec} from 'react-vega';

export default createClassFromSpec('BarChart', {
  "width": 400,
  "height": 200,
  "data": [{ "name": "table" }],
  "signals": [
    {
      "name": "tooltip",
      "value": {},
      "on": [
        {"events": "rect:mouseover", "update": "datum"},
        {"events": "rect:mouseout",  "update": "{}"}
      ]
    }
  ],
  ... // See the rest in demo/src/vega/spec1.js
});
```

#### main.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './BarChart.js';

const barData = {
  table: [...]
};

function handleHover(...args){
  console.log(args);
}

ReactDOM.render(
  <BarChart data={barData} onSignalHover={handleHover}/>,
  document.getElementById('bar-container')
);
```

### Approach#2 Use `<Vega>` generic class and pass in `spec` for dynamic component.

Provides a bit more flexibility, but at the cost of extra checks for spec changes.

#### main.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Vega from 'react-vega';

const spec = {
  "width": 400,
  "height": 200,
  "data": [{ "name": "table" }],
  "signals": [
    {
      "name": "tooltip",
      "value": {},
      "on": [
        {"events": "rect:mouseover", "update": "datum"},
        {"events": "rect:mouseout",  "update": "{}"}
      ]
    }
  ],
  ... // See the rest in demo/src/vega/spec1.js
}

const barData = {
  table: [...]
};

function handleHover(...args){
  console.log(args);
}

ReactDOM.render(
  <Vega spec={spec} data={barData} onSignalHover={handleHover}/>,
  document.getElementById('bar-container')
);
```

### Props

React class `Vega` and any output class from `createClassFromSpec` have these properties:

#### Basic

- **className**:String
- **style**:Object

#### Props correspond to [Vega's View Component API](https://github.com/vega/vega/wiki/Runtime#view-component-api)

- **width**:Number
- **height**:Number
- **padding**:Object
- **renderer**:String
- **logLevel**:Number
- **background**:String
- **tooltip**:Function
- **enableHover**:Boolean -- equivalent to calling `view.hover()`

#### Data

- **data**:Object

For `data`, this property takes an Object with keys being dataset names defined in the spec's data field, such as:

```javascript
var barData = {
  table: [{"x": 1,  "y": 28}, {"x": 2,  "y": 55}, ...]
};
```

Each value can be an *array* or `function(dataset){...}`. If the value is a function, Vega's `vis.data(dataName)` will be passed as the argument `dataset`.

```javascript
var barData = {
  table: function(dataset){...}
};
```
In the example above, `vis.data('table')` will be passed as `dataset`.

- **onSignal***XXX* - Include all signals defined in the spec automatically.

All signals defined in the spec can be listened to via these properties.
For example, to listen to signal *hover*, attach a listener to `onSignal+capitalize('hover')`

```javascript
 <Vega spec={spec} data={barData} onSignalHover={handleHover}/>
```

#### Event handlers

- **onNewView**:Function Dispatched when new vega.View is constructed and pass the newly created view as argument.
- **onParseError**:Function Dispatched when vega cannot parse the spec.

### Static function

Any class created from `createClassFromSpec` will have this method.

- Chart.**getSpec()** - return `spec`

## Frequently Asked Questions

### How to use Vega Tooltip?

You can pass the [`vega-tooltip`](https://github.com/vega/vega-tooltip) handler instance to the `tooltip` property.

```javascript
import { Handler } from 'vega-tooltip';

 <Vega spec={spec} data={barData} tooltip={new Handler().call} />
```

[npm-image]: https://badge.fury.io/js/react-vega.svg
[npm-url]: https://npmjs.org/package/react-vega
[travis-image]: https://travis-ci.org/kristw/react-vega.svg?branch=master
[travis-url]: https://travis-ci.org/kristw/react-vega
[daviddm-image]: https://david-dm.org/kristw/react-vega.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kristw/react-vega
