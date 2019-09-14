import isFunction from '../../src/utils/isFunction';

describe('isFunction(func)', () => {
  it('returns true for function', () => {
    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction(() => 1)).toBeTruthy();
  });
  it('returns false otherwise', () => {
    expect(isFunction(0)).toBeFalsy();
    expect(isFunction('abc')).toBeFalsy();
    expect(isFunction({})).toBeFalsy();
    expect(isFunction([])).toBeFalsy();
  });
});
