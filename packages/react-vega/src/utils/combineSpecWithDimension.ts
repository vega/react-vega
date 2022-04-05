import { VisualizationSpec } from '../types';

export default function combineSpecWithDimension(props: {
  spec: VisualizationSpec;
  width?: number;
  height?: number;
}): VisualizationSpec {
  const { spec, width, height } = props;
  if (typeof width !== 'undefined' && typeof height !== 'undefined') {
    return { ...spec, width, height };
  }
  if (typeof width !== 'undefined') {
    return { ...spec, width };
  }
  if (typeof height !== 'undefined') {
    return { ...spec, height };
  }
  return spec;
}
