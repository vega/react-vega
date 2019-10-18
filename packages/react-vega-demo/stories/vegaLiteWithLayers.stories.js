/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { VegaLite } from '../../react-vega/src';

const DATA = {
  myData: [
    { a: "A", b: 20 },
    { a: "B", b: 34 },
    { a: "C", b: 55 },
    { a: "D", b: 19 },
    { a: "E", b: 40 },
    { a: "F", b: 34 },
    { a: "G", b: 91 },
    { a: "H", b: 78 },
    { a: "I", b: 25 }
  ]
};

const SPEC = {
  description: "A simple bar chart with embedded data.",
  layer: [
    {
      data: { name: "myData" },
      encoding: {
        x: { field: "a", type: "ordinal" },
        y: { field: "b", type: "quantitative" }
      },
      mark: "bar"
    }
  ]
};

storiesOf('react-vega', module)
  .add('VegaLite with layers', () => <><VegaLite spec={SPEC} data={DATA} /><div><pre>{JSON.stringify(SPEC, null, 2)}</pre></div></>);
