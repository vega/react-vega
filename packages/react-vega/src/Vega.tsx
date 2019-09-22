import React from 'react';
import { vega } from 'vega-embed';
import VegaEmbed, { VegaEmbedProps } from './VegaEmbed';
import isFunction from './utils/isFunction';
import { PlainObject, View, ViewListener } from './types';
import shallowEqual from './utils/shallowEqual';
import { NOOP } from './constants';
import getDatasetNamesFromSpec from './utils/getDatasetNamesFromSpec';

export type VegaProps = VegaEmbedProps & {
  data?: PlainObject;
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

const EMPTY = {};

export default class Vega extends React.PureComponent<VegaProps> {
  static defaultProps = {
    data: EMPTY,
  };

  vegaEmbed = React.createRef<VegaEmbed>();

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps: VegaProps) {
    if (!shallowEqual(this.props.data, prevProps.data)) {
      this.update();
    }
  }

  handleNewView: ViewListener = (view: View) => {
    this.update();
    const { onNewView = NOOP } = this.props;
    onNewView(view);
  };

  update() {
    const { data, spec } = this.props;

    if (data) {
      const datasetNames = getDatasetNamesFromSpec(spec).filter(name => data[name]);

      if (this.vegaEmbed.current && datasetNames.length > 0) {
        this.vegaEmbed.current.modifyView(view => {
          datasetNames.forEach(name => {
            updateData(view, name, data[name]);
          });
          view.run();
        });
      }
    }
  }

  render() {
    const { data, ...restProps } = this.props;

    return <VegaEmbed ref={this.vegaEmbed} {...restProps} onNewView={this.handleNewView} />;
  }
}
