import React from 'react';
import vegaEmbed, { EmbedOptions, VisualizationSpec, Result, vega } from 'vega-embed';
import { isFunction } from './util';
import listenerName from './utils/listenerName';

export type VegaEmbedProps = {
  className?: string;
  spec: string | VisualizationSpec;
  style?: { [key: string]: any };
  onNewView?: (view: Result['view']) => {};
  onError?: (error: Error) => {};
} & EmbedOptions;

const NOOP = () => {};

export default class VegaEmbed extends React.PureComponent<VegaEmbedProps> {
  containerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.createView();
  }

  componentDidUpdate() {
    this.clearView();
    this.createView();
  }

  componentWillUnmount() {
    this.clearView();
  }

  view?: Result['view'];

  createView() {
    const { spec, onNewView = NOOP, onError = NOOP } = this.props;
    if (this.containerRef.current) {
      vegaEmbed(this.containerRef.current, spec)
        .then(({ view }) => {
          if (typeof spec !== 'string' && 'signals' in spec && spec.signals) {
            spec.signals.forEach(signal => {
              view.addSignalListener(signal.name, (...args) => {
                const listener = this.props[listenerName(signal.name)];
                if (listener) {
                  listener.apply(this, args);
                }
              });
            });
          }

          this.view = view;
          onNewView(view);

          return view;
        })
        .catch((reason: any) => {
          onError(reason);
        });
    }
  }

  clearView() {
    if (this.view) {
      this.view.finalize();
      this.view = null;
    }

    return this;
  }

  updateData(name, value) {
    if (value) {
      if (isFunction(value)) {
        value(this.view.data(name));
      } else {
        this.view.change(
          name,
          vega
            .changeset()
            .remove(() => true)
            .insert(value),
        );
      }
    }
  }

  render() {
    const { className, style } = this.props;

    return (
      // Create the container Vega draws inside
      <div ref={this.containerRef} className={className} style={style} />
    );
  }
}
