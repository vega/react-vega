import React from 'react';
import { VisualizationSpec } from 'vega-embed';
import Vega, { VegaProps } from './VegaEmbedWithData';

// USAGE:
// createClassFromSpec(name, spec);
// createClassFromSpec(spec);
export default function createClassFromSpec(
  ...args: [VisualizationSpec] | [string, VisualizationSpec]
) {
  const spec = args.length === 1 ? args[0] : args[1];

  class VegaChart extends React.PureComponent<Omit<VegaProps, 'spec'>> {
    static getSpec = function getSpec() {
      return spec;
    };

    render() {
      return <Vega spec={spec} {...this.props} />;
    }
  }

  return VegaChart;
}
