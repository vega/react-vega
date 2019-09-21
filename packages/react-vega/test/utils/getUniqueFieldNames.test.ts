import getUniqueFieldNames from '../../src/utils/getUniqueFieldNames';

describe('getUniqueFieldNames(objects)', () => {
  it('returns a set of field names', () => {
    const fields = getUniqueFieldNames([{ a: 1, b: 1 }, { b: 2 }, { c: 3 }]);
    expect(Array.from(fields)).toEqual(['a', 'b', 'c']);
  });
});
