export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isDefined(x: any) {
  return x !== null && x !== undefined;
}

export function isFunction(functionToCheck: any): functionToCheck is Function {
  const getType = {};

  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
