import React from 'react';
import Vega, { VegaProps } from './Vega';

export type VegaLiteProps = Omit<VegaProps, 'mode'>;

export default function VegaLite(props: VegaLiteProps) {
  return <Vega {...props} mode="vega-lite" />;
}
