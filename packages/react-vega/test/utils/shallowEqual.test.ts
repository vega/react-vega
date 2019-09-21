import shallowEqual from '../../src/utils/shallowEqual';

describe('shallowEqual(a, b)', () => {
  it('returns true if all fields are the same', () => {
    expect(shallowEqual({ a: 1 }, { a: 1 })).toBeTruthy();
    const value = { b: 1 };
    expect(shallowEqual({ a: value }, { a: value })).toBeTruthy();
  });
  it('does not check recursively', () => {
    expect(shallowEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBeFalsy();
  });
  it('returns false otherwise', () => {
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBeFalsy();
    expect(shallowEqual({ b: 1 }, { a: 2 })).toBeFalsy();
  });
});
