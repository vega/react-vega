<!--**Introduction** |
[Demo](https://kristw.github.io/react-vega) |
[API Reference](https://github.com/kristw/react-vega/blob/master/docs/api.md)-->

# react-vega [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

<!--[![Build Status][travis-image]][travis-url]-->

Convert Vega spec into React class conveniently

**Demo**: http://kristw.github.io/linked-highlighting-react-vega-redux/

### Install

```bash
npm install react-vega --save
```

or

```bash
bower install react-vega --save
```

### Example Usage

#### BarChart.js

```javascript
import React, { PropTypes } from 'react';
import {createClassFromSpec} from './react-vega.js';

export default createClassFromSpec('BarChart', {
  "width": 400,
  "height": 200,
  "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
  "data": [{ "name": "table" }],
  'signals': [
    {
      'name': 'hover', 'init': null,
      'streams': [
        {'type': '@bar:mouseover', 'expr': 'datum'},
        {'type': '@bar:mouseout', 'expr': 'null'}
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "ordinal",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": {"data": "table", "field": "y"},
      "nice": true
    }
  ],
  "axes": [
    {"type": "x", "scale": "x"},
    {"type": "y", "scale": "y"}
  ],
  "marks": [
    {
      "type": "rect",
      "name": "bar",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "x": {"scale": "x", "field": "x"},
          "width": {"scale": "x", "band": true, "offset": -1},
          "y": {"scale": "y", "field": "y"},
          "y2": {"scale": "y", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ]
});
```

#### main.js

```javascript
import React from 'react';
import { render } from 'react-dom';
import BarChart from './BarChart.js';

const barData = {
  table: [
    {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
    {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
    {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
    {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
    {"x": 9,  "y": 52}, {"x": 10, "y": 48},
    {"x": 11, "y": 24}, {"x": 12, "y": 49},
    {"x": 13, "y": 87}, {"x": 14, "y": 66},
    {"x": 15, "y": 17}, {"x": 16, "y": 27},
    {"x": 17, "y": 68}, {"x": 18, "y": 16},
    {"x": 19, "y": 49}, {"x": 20, "y": 15}
  ]
};

function handleHover(...args){
  console.log(args);
}

render(
  <BarChart data={barData} onSignalHover={handleHover}/>,
  document.getElementById('bar-container')
);
```

### Properties

- width
- height
- padding
- viewport
- renderer
- data
- onSignal[...] - Include all signals defined in the spec automatically.

## License

© 2016 [Krist Wongsuphasawat](http://kristw.yellowpigz.com)  ([@kristw](https://twitter.com/kristw)) Apache-2.0 License

[npm-image]: https://badge.fury.io/js/react-vega.svg
[npm-url]: https://npmjs.org/package/react-vega
[travis-image]: https://travis-ci.org/kristw/react-vega.svg?branch=master
[travis-url]: https://travis-ci.org/kristw/react-vega
[daviddm-image]: https://david-dm.org/kristw/react-vega.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kristw/react-vega