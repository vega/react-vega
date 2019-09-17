import React from 'react';
import { vega } from 'vega-embed';
import VegaEmbed, { VegaEmbedProps } from './VegaEmbed';
import isFunction from './utils/isFunction';
import { PlainObject, View } from './types';

export type VegaProps = VegaEmbedProps & {
  data: PlainObject;
};

function updateData(view: View, name: string, value: any) {
  if (value) {
    if (isFunction(value)) {
      value(view.data(name));
    } else {
      view.change(
        name,
        vega
          .changeset()
          .remove(() => true)
          .insert(value),
      );
    }
  }
}

export default class Vega extends React.PureComponent<VegaProps> {
  vegaEmbed = React.createRef<VegaEmbed>();

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, spec } = this.props;
    if (this.vegaEmbed.current) {
      this.vegaEmbed.current.modifyView(view => {
        if (data && spec.data) {
          if (Array.isArray(spec.data)) {
            // Array of data
            spec.data
              .filter(({ name }) => data[name])
              .forEach(({ name }) => {
                updateData(view, name, data[name]);
              });
          } else {
            // Single data
            const { name } = spec.data;
            if (typeof name === 'string') {
              updateData(view, name, data[name]);
            }
          }
          view.run();
        }
      });
    }
  }

  render() {
    const { data, ...restProps } = this.props;

    return <VegaEmbed ref={this.vegaEmbed} {...restProps} />;
  }
}
