import { VisualizationSpec } from 'vega-embed';
import equal from 'fast-deep-equal';
import getUniqueFieldNames from './getUniqueFieldNames';

export const EXPENSIVE_FIELDS = 'EXPENSIVE_FIELDS';

export default function isSpecChanged(a: VisualizationSpec, b: VisualizationSpec) {
  if (a === b) return false;

  const changes = new Set<string>();

  const fieldNames = getUniqueFieldNames([a, b]);

  if (fieldNames.has('width') && (!('width' in a) || !('width' in b) || a.width !== b.width)) {
    changes.add('width');
  }

  if (fieldNames.has('height') && (!('height' in a) || !('height' in b) || a.height !== b.height)) {
    changes.add('height');
  }

  if (
    fieldNames.has('background') &&
    (!('background' in a) || !('background' in b) || a.background !== b.background)
  ) {
    changes.add('background');
  }

  if (
    fieldNames.has('padding') &&
    (!('padding' in a) || !('padding' in b) || !equal(a.padding, b.padding))
  ) {
    changes.add('padding');
  }

  // Delete cheap fields
  fieldNames.delete('width');
  fieldNames.delete('height');
  fieldNames.delete('padding');
  fieldNames.delete('background');

  if (
    [...fieldNames].some(
      field =>
        !(field in a) ||
        !(field in b) ||
        !equal(a[field as keyof typeof a], b[field as keyof typeof b]),
    )
  ) {
    changes.add(EXPENSIVE_FIELDS);
  }

  return changes.size > 0 ? changes : false;
}
