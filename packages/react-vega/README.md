# react-vega [![NPM version][npm-image]][npm-url]

> Easily add `vega` or `vega-lite` visualizations to your `react` application!

**DEMO**: http://vega.github.io/react-vega/

## Install

```bash
npm install vega vega-lite react-vega --save
```

## Usage

Let's say you have a [Vega specification](https://vega.github.io/vega/docs/specification/) for a bar chart that you want to display in your React application. Create a new file, `BarChart.js`, add your spec, and convert it into a React component with `createClassFromSpec`.

```js
// BarChart.js
import { createClassFromSpec } from "react-vega";

const spec = {
  width: 400,
  height: 200,
  data: [{ name: "table" }],
  signals: [
    {
      name: "tooltip",
      value: {},
      on: [
        { events: "rect:mouseover", update: "datum" },
        { events: "rect:mouseout", update: "{}" }
      ]
    }
  ],
  scales: [
    {
      name: "xscale",
      type: "band",
      domain: { data: "table", field: "category" },
      range: "width"
    },
    {
      name: "yscale",
      domain: { data: "table", field: "amount" },
      nice: true,
      range: "height"
    }
  ],
  axes: [
    { orient: "bottom", scale: "xscale" },
    { orient: "left", scale: "yscale" }
  ],
  marks: [
    {
      type: "rect",
      from: { data: "table" },
      encode: {
        enter: {
          x: { scale: "xscale", field: "category", offset: 1 },
          width: { scale: "xscale", band: 1, offset: -1 },
          y: { scale: "yscale", field: "amount" },
          y2: { scale: "yscale", value: 0 }
        },
        update: {
          fill: { value: "steelblue" }
        },
        hover: {
          fill: { value: "red" }
        }
      }
    },
    {
      type: "text",
      encode: {
        enter: {
          align: { value: "center" },
          baseline: { value: "bottom" },
          fill: { value: "#333" }
        },
        update: {
          x: { scale: "xscale", signal: "tooltip.category", band: 0.5 },
          y: { scale: "yscale", signal: "tooltip.amount", offset: -2 },
          text: { signal: "tooltip.amount" },
          fillOpacity: [{ test: "datum === tooltip", value: 0 }, { value: 1 }]
        }
      }
    }
  ]
};

const BarChart = createClassFromSpec({
  spec
});

export default BarChart;
```

Now import and use `BarChart` like any other React component:

```js
import React from "react";
import BarChart from "./BarChart.js";

const barData = {
  table: [
    { category: "A", amount: 28 },
    { category: "B", amount: 55 },
    { category: "C", amount: 43 },
    { category: "D", amount: 91 },
    { category: "E", amount: 81 },
    { category: "F", amount: 53 },
    { category: "G", amount: 19 },
    { category: "H", amount: 89 }
  ]
};

// Optional.
// signalListeners is only needed if you want to listen for chart interactions.
function handleHover(name, data) {
  console.log({ name, data });
  // {
  //   name: "tooltip",
  //   data: {
  //     amount: 28,
  //     category: "A",
  //     Symbol(vega_id): 810
  //   }
  // }
}
const signalListeners = { tooltip: handleHover };

export default function App() {
  return <BarChart data={barData} signalListeners={signalListeners} />;
}
```

Check out the result in this [CodeSandbox](https://codesandbox.io/s/react-vega-bar-chart-qecmh?file=/src/App.js)!

## Versions

* `react-vega@7.x.x` is rewritten in typescript with several API changes and now support both `vega` and `vega-lite`. If you are upgrading from `react-vega` or `react-vega-lite` version `6.x.x` to `7.x.x`, read this [migration guide](https://github.com/vega/react-vega/blob/master/CHANGELOG.md#-migration-guide).
* `react-vega@6.x.x` is same with `5.x.x` but output are in different directories and exported as both `commonjs` and `es module`.
* `react-vega@5.x.x` uses `vega` again.
* `react-vega@4.x.x` has same interface with `3.x.x` except it uses the lightweight `vega-lib` instead of `vega`.
* `react-vega@3.x.x` was update with breaking changes to support `vega@3.0`.
* If you are looking to use `react` with `vega@2.x`, please use `react-vega@2.3.1`.


## Additional examples

The BarChart example took the approach of creating a React class from a spec, but there are two other options.

### `<Vega>`

One alternative is to use the generic `<Vega>` component; this provides a bit more flexibility, but at the cost of extra checks for spec changes.

#### main.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Vega } from 'react-vega';

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
  ... // See the rest in packages/react-vega-demo/stories/vega/spec1.js
}

const barData = {
  table: [...]
};

function handleHover(name, data){
  console.log({name, data});
}
const signalListeners = { tooltip: handleHover };

ReactDOM.render(
  <Vega spec={spec} data={barData} signalListeners={signalListeners} />,
  document.getElementById('bar-container')
);
```

### `<VegaLite>`

The last option is to use the generic `<VegaLite>` component and pass in a `spec`; this provides a bit more flexibility, but at the cost of extra checks for spec changes.

Also see packages/react-vega-demo/stories/ReactVegaLiteDemo.jsx for details

#### main.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { VegaLite } from 'react-vega'

const spec = {
  width: 400,
  height: 200,
  mark: 'bar',
  encoding: {
    x: { field: 'a', type: 'ordinal' },
    y: { field: 'b', type: 'quantitative' },
  },
  data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
}

const barData = {
  table: [
    { a: 'A', b: 28 },
    { a: 'B', b: 55 },
    { a: 'C', b: 43 },
    { a: 'D', b: 91 },
    { a: 'E', b: 81 },
    { a: 'F', b: 53 },
    { a: 'G', b: 19 },
    { a: 'H', b: 87 },
    { a: 'I', b: 52 },
  ],
}

ReactDOM.render(
  <VegaLite spec={spec} data={barData} />,
  document.getElementById('bar-container')
);
```

## API

### Props

React class `Vega` and any output class from `createClassFromSpec` have these properties:

#### Props from [vega-embed's API](https://github.com/vega/vega-embed)

`mode`, `theme`, `defaultStyle`, `renderer`, `logLovel`, `tooltip`, `loader`, `patch`, `width`, `height`, `padding`, `actions`, `scaleFactor`, `config`, `editorUrl`, `sourceHeader`, `sourceFooter`, `hover`, `i18n`, `downloadFileName`

#### CSS

class and style of the container `<div>` element

- **className**:String
- **style**:Object

#### Data

- **data**:Object

For `data`, this property takes an Object with keys being dataset names defined in the spec's data field, such as:

```js
var barData = {
  table: [{"x": 1,  "y": 28}, {"x": 2,  "y": 55}, ...]
};
```

Each value can be an *array* or `function(dataset){...}`. If the value is a function, Vega's `vis.data(dataName)` will be passed as the argument `dataset`. If you are using `<VegaLite>` make sure to enable your tooltip in the the spec, as [described here](https://vega.github.io/vega-lite/docs/tooltip.html#using-tooltip-channel).

```js
var barData = {
  table: function(dataset){...}
};
```

In the example above, `vis.data('table')` will be passed as `dataset`.

- **signalListeners**:Object

All signals defined in the spec can be listened to via `signalListeners`.
For example, to listen to signal *tooltip*, attach a listener like this

```js
// better declare outside of render function
const signalListeners = { tooltip: handleHover };

<Vega spec={spec} data={barData} signalListeners={signalListeners} />
```

#### Event listeners

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

[npm-image]: https://img.shields.io/npm/v/react-vega.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-vega
