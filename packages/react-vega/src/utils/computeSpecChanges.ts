import equal from 'fast-deep-equal';
import getUniqueFieldNames from './getUniqueFieldNames';
import { VisualizationSpec } from '../types';

interface SpecChanges {
  width: false | number;
  height: false | number;
  isExpensive: boolean;
}

export default function computeSpecChanges(newSpec: VisualizationSpec, oldSpec: VisualizationSpec) {
  if (newSpec === oldSpec) return false;

  const changes: SpecChanges = {
    width: false,
    height: false,
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

  // Delete cheap fields
  fieldNames.delete('width');
  fieldNames.delete('height');

  if (
    [...fieldNames].some(
      (field) =>
        !(field in newSpec) ||
        !(field in oldSpec) ||
        !equal(newSpec[field as keyof typeof newSpec], oldSpec[field as keyof typeof oldSpec]),
    )
  ) {
    changes.isExpensive = true;
  }

  return changes.width !== false || changes.height !== false || changes.isExpensive
    ? changes
    : false;
}
