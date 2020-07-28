import { View, SignalListeners } from '../types';

export default function removeSignalListenersFromView(
  view: View,
  signalListeners: SignalListeners,
) {
  const signalNames = Object.keys(signalListeners);
  signalNames.forEach((signalName) => {
    try {
      view.removeSignalListener(signalName, signalListeners[signalName]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Cannot remove invalid signal listener.', error);
    }
  });

  return signalNames.length > 0;
}
