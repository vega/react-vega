import React from 'react';
import VegaEmbed, { VegaEmbedProps } from './VegaEmbed';
import { PlainObject, View, ViewListener } from './types';
import shallowEqual from './utils/shallowEqual';
import updateVegaViewDataset from './utils/updateVegaViewDataset';
import { NOOP } from './constants';

export type VegaProps = VegaEmbedProps & {
  data?: PlainObject;
};

const EMPTY = {};

export default class Vega extends React.PureComponent<VegaProps> {
  vegaEmbed = React.createRef<VegaEmbed>();

  static defaultProps = {
    data: EMPTY,
  };

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
    const { data } = this.props;

    if (data) {
      const datasetNames = Object.keys(data);

      if (this.vegaEmbed.current && datasetNames.length > 0) {
        this.vegaEmbed.current.modifyView(view => {
          datasetNames.forEach(name => {
            updateVegaViewDataset(view, name, data[name]);
          });
          view.resize().run();
        });
      }
    }
  }

  render() {
    const { data, ...restProps } = this.props;

    return <VegaEmbed ref={this.vegaEmbed} {...restProps} onNewView={this.handleNewView} />;
  }
}
