import updateSingleDatasetInView from './updateSingleDatasetInView';
import { PlainObject, View } from '../types';

export default function updateMultipleDatasetsInView(view: View, data: PlainObject) {
  Object.keys(data).forEach((name) => {
    updateSingleDatasetInView(view, name, data[name]);
  });
}
