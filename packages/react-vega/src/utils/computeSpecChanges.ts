import { VisualizationSpec } from 'vega-embed';
import equal from 'fast-deep-equal';
import getUniqueFieldNames from './getUniqueFieldNames';

interface SpecChanges {
  width: false | number;
  height: false | number;
  padding:
    | false
    | number
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
  isExpensive: boolean;
}

export default function computeSpecChanges(newSpec: VisualizationSpec, oldSpec: VisualizationSpec) {
  if (newSpec === oldSpec) return false;

  const changes: SpecChanges = {
    width: false,
    height: false,
    padding: false,
    isExpensive: false,
  };

  const fieldNames = getUniqueFieldNames([newSpec, oldSpec]);

  if (
    fieldNames.has('width') &&
    (!('width' in newSpec) || !('width' in oldSpec) || newSpec.width !== oldSpec.width)
  ) {
    if ('width' in newSpec && typeof newSpec.width === 'number') {
      changes.width = newSpec.width;
    } else {
      changes.isExpensive = true;
    }
  }

  if (
    fieldNames.has('height') &&
    (!('height' in newSpec) || !('height' in oldSpec) || newSpec.height !== oldSpec.height)
  ) {
    if ('height' in newSpec && typeof newSpec.height === 'number') {
      changes.height = newSpec.height;
    } else {
      changes.isExpensive = true;
    }
  }

  if (
    fieldNames.has('padding') &&
    (!('padding' in newSpec) || !('padding' in oldSpec) || !equal(newSpec.padding, oldSpec.padding))
  ) {
    if ('padding' in newSpec && typeof newSpec.padding !== 'undefined') {
      changes.padding = newSpec.padding;
    } else {
      changes.isExpensive = true;
    }
  }

  // Delete cheap fields
  fieldNames.delete('width');
  fieldNames.delete('height');
  fieldNames.delete('padding');

  if (
    [...fieldNames].some(
      field =>
        !(field in newSpec) ||
        !(field in oldSpec) ||
        !equal(newSpec[field as keyof typeof newSpec], oldSpec[field as keyof typeof oldSpec]),
    )
  ) {
    changes.isExpensive = true;
  }

  return changes.width !== false ||
    changes.height !== false ||
    changes.padding !== false ||
    changes.isExpensive
    ? changes
    : false;
}
