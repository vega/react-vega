export default {
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  width: 100,
  height: 100,
  data: {
    values: [
      {
        a: 'A',
        b: 28,
      },
      {
        a: 'B',
        b: 55,
      },
      {
        a: 'C',
        b: 43,
      },
      {
        a: 'D',
        b: 91,
      },
      {
        a: 'E',
        b: 81,
      },
    ],
    name: 'source',
  },
  mark: 'bar',
  encoding: {
    x: {
      field: 'a',
      type: 'ordinal',
    },
    y: {
      field: 'b',
      type: 'quantitative',
    },
    tooltip: {
      field: 'b',
      type: 'quantitative',
    },
  },
};
