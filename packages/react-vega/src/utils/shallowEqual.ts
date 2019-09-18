import { PlainObject } from '../types';

export default function shallowEqual(a: PlainObject = {}, b: PlainObject = {}) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  return a === b || (aKeys.length === bKeys.length && aKeys.every(key => a[key] === b[key]));
}
