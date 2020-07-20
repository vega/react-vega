import { VisualizationSpec } from '../types';

export default function getDatasetNamesFromSpec(spec: VisualizationSpec) {
  const { data } = spec;
  if (data) {
    if (Array.isArray(data)) {
      // Array of data
      return data.map(({ name }) => name);
    }
    if (typeof data.name === 'string') {
      // Single data
      return [data.name];
    }
  }

  return [];
}
