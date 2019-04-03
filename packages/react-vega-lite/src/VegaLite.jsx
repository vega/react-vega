import React from 'react';
import * as vl from 'vega-lite';
import Vega from 'react-vega';

const VegaLite = props => {
  const parsedProps = { ...props };
  const { spec, data } = props;
  const combinedSpec = { ...spec };
  if (data) {
    combinedSpec.data = data;
    delete parsedProps.data;
  }
  parsedProps.spec = vl.compile(combinedSpec).spec;

  return <Vega {...parsedProps} />;
};

VegaLite.propTypes = Vega.propTypes;

export default VegaLite;
