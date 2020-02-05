export default function isFunction(functionToCheck: unknown): functionToCheck is Function {
  const getType = {};

  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
