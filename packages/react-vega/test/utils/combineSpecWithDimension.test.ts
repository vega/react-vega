import combineSpecWithDimension from '../../src/utils/combineSpecWithDimension';

describe('combineSpecWithDimension(props)', () => {
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {
      values: [],
      name: 'source',
    },
    mark: 'bar',
    encoding: {
      y: {
        field: 'b',
        type: 'quantitative',
      },
    },
  } as const;

  it('adds width and height', () => {
    expect(combineSpecWithDimension({ spec, width: 100, height: 100 })).toEqual({
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      width: 100,
      height: 100,
      data: {
        values: [],
        name: 'source',
      },
      mark: 'bar',
      encoding: {
        y: {
          field: 'b',
          type: 'quantitative',
        },
      },
    });
  });

  it('adds width', () => {
    expect(combineSpecWithDimension({ spec, width: 100 })).toEqual({
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      width: 100,
      data: {
        values: [],
        name: 'source',
      },
      mark: 'bar',
      encoding: {
        y: {
          field: 'b',
          type: 'quantitative',
        },
      },
    });
  });

  it('adds height', () => {
    expect(combineSpecWithDimension({ spec, height: 100 })).toEqual({
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      height: 100,
      data: {
        values: [],
        name: 'source',
      },
      mark: 'bar',
      encoding: {
        y: {
          field: 'b',
          type: 'quantitative',
        },
      },
    });
  });

  it('returns original if no width or height are defined', () => {
    expect(combineSpecWithDimension({ spec })).toBe(spec);
  });
});
