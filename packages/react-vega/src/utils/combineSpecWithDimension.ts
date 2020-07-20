import { VisualizationSpec } from '../types';
import { VegaEmbedProps } from '../VegaEmbed';

export default function combineSpecWithDimension(props: VegaEmbedProps): VisualizationSpec {
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
