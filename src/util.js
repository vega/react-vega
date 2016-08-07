export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isDefined(x) {
  return x !== null && x !== undefined;
}

export function isFunction(functionToCheck) {
  const getType = {};
  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
