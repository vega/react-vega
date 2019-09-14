import React from 'react';
import { vega, Result } from 'vega-embed';
import VegaEmbed, { VegaEmbedProps } from './VegaEmbed';
import isFunction from './utils/isFunction';

export type VegaProps = VegaEmbedProps & {
  data: { [key: string]: any };
};

function updateData(view: Result['view'], name: string, value: any) {
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
      const { viewPromise } = this.vegaEmbed.current;
      if (viewPromise) {
        viewPromise
          .then(view => {
            if (view && data && spec.data && Array.isArray(spec.data)) {
              spec.data
                .filter(({ name }) => data[name])
                .forEach(({ name }) => {
                  updateData(view, name, data[name]);
                });
              view.run();
            }

            return true;
          })
          .catch(() => {});
      }
    }
  }

  render() {
    const { data, ...restProps } = this.props;

    return <VegaEmbed ref={this.vegaEmbed} {...restProps} />;
  }
}
