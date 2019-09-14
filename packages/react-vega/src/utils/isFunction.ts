export default function isFunction(functionToCheck: any): functionToCheck is Function {
  const getType = {};

  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
