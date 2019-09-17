import { PlainObject } from '../types';

export default function areObjectsShallowEqual(a: PlainObject, b: PlainObject) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(key => a[key] === b[key]);
}
