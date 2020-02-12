import getDatasetNamesFromSpec from '../../src/utils/getDatasetNamesFromSpec';

describe('getDatasetNamesFromSpec()', () => {
  it('returns dataset names for array', () => {
    expect(
      getDatasetNamesFromSpec({
        data: [
          {
            name: 'set1',
          },
          {
            name: 'set2',
          },
        ],
      }),
    ).toEqual(['set1', 'set2']);
  });
  it('returns dataset name for single dataset', () => {
    expect(
      // @ts-ignore
      getDatasetNamesFromSpec({
        data: {
          name: 'set1',
        },
      }),
    ).toEqual(['set1']);
  });
  it('returns empty array if data is not specified', () => {
    expect(getDatasetNamesFromSpec({})).toEqual([]);
  });
});
