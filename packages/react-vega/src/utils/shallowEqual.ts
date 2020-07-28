import { PlainObject } from '../types';

const EMPTY = {};

export default function shallowEqual(a: PlainObject = EMPTY, b: PlainObject = EMPTY) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  return a === b || (aKeys.length === bKeys.length && aKeys.every((key) => a[key] === b[key]));
}
