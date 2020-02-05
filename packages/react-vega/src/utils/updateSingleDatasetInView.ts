import { vega } from 'vega-embed';
import isFunction from './isFunction';
import { View } from '../types';

export default function updateVegaViewDataset(view: View, name: string, value: unknown) {
  if (value) {
    if (isFunction(value)) {
      value(view.data(name));
    } else {
      view.change(
        name,
        vega
          .changeset()
          .remove(() => true)
          .insert(value),
      );
    }
  }
}
