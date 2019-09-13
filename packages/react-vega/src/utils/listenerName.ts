import { capitalize } from '../util';

export default function listenerName(signalName) {
  return `onSignal${capitalize(signalName)}`;
}
