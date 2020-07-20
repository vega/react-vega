import React from 'react';
import { VisualizationSpec, Mode } from './types';
import Vega, { VegaProps } from './Vega';

interface Constructor<T> {
  getSpec: () => VisualizationSpec;
  new (...args: unknown[]): T;
}

export type FixedVegaChartProps = Omit<VegaProps, 'spec'>;

export default function createClassFromSpec({
  mode,
  spec,
}: {
  mode?: Mode;
  spec: VisualizationSpec;
}) {
  class FixedVegaChart extends React.PureComponent<FixedVegaChartProps> {
    static getSpec = function getSpec() {
      return spec;
    };

    render() {
      return <Vega mode={mode} spec={spec} {...this.props} />;
    }
  }

  return FixedVegaChart as Constructor<React.PureComponent<FixedVegaChartProps>>;
}
