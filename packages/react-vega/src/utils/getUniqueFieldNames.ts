import { VisualizationSpec } from 'vega-embed';
import { PlainObject } from '../types';

export default function getUniqueFieldNames(objects: (PlainObject | VisualizationSpec)[]) {
  const fields = new Set<string>();
  objects.forEach(o => {
    Object.keys(o).forEach(field => {
      fields.add(field);
    });
  });

  return fields;
}
