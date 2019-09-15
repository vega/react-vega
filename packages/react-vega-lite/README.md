# WARNING: THIS PACKAGE IS DEPRECATED.

The development has stop at version 6 since `react-vega` now can handle `vega-lite` spec as well.

Please use `react-vega` instead.

```js
import { Vega, VegaLite, createClassFromSpec } from 'react-vega';

// Option 1. When spec has $schema field that is a valid vega-lite schema url. Vega will automatically parse vega-lite spec.
<Vega spec={spec} />
// Option 2. Enforce mode manually.
<Vega mode="vega-lite" spec={spec} />
// Option 3. Syntactic sugar of option 3.
<VegaLite spec={spec} />
```

# react-vega-lite [![NPM version][npm-image]][npm-url]

Convert Vega Lite spec into React class conveniently, inspired by this [tutorial](https://medium.com/@pbesh/react-and-vega-an-alternative-visualization-example-cd76e07dc1cd#.omslw1xy8) by @pbeshai

Documentation of `react-vega-lite` version 6 [can be found here](https://github.com/vega/react-vega/tree/v6.1.0/packages/react-vega-lite).


[npm-image]: https://img.shields.io/npm/v/react-vega-lite.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-vega-lite
