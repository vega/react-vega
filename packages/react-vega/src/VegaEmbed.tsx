import React, { CSSProperties } from 'react';
import vegaEmbed, { EmbedOptions, VisualizationSpec } from 'vega-embed';
import { ViewListener, View, SignalListeners } from './types';

export type VegaEmbedProps = {
  className?: string;
  spec: VisualizationSpec;
  signalListeners?: SignalListeners;
  style?: CSSProperties;
  onNewView?: ViewListener;
  onError?: (error: Error) => {};
} & EmbedOptions & {};

const NOOP = () => {};

export default class VegaEmbed extends React.PureComponent<VegaEmbedProps> {
  containerRef = React.createRef<HTMLDivElement>();

  viewPromise?: Promise<View | undefined>;

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

  handleError = (error: Error) => {
    const { onError = NOOP } = this.props;
    onError(error);
    console.warn(error);

    return undefined;
  };

  modifyView = (action: ViewListener) => {
    if (this.viewPromise) {
      this.viewPromise
        .then(view => {
          if (view) {
            action(view);
          }

          return true;
        })
        .catch(this.handleError);
    }
  };

  createView() {
    const { spec, onNewView = NOOP, onError = NOOP, signalListeners = {}, ...options } = this.props;
    if (this.containerRef.current) {
      this.viewPromise = vegaEmbed(this.containerRef.current, spec, options)
        .then(({ view }) => {
          const signalNames = Object.keys(signalListeners);
          signalNames.forEach(signalName => {
            try {
              view.addSignalListener(signalName, signalListeners[signalName]);
            } catch (ex) {
              console.warn('Cannot add invalid signal handler >>', ex);
            }
          });
          if (signalNames.length > 0) {
            view.run();
          }
          onNewView(view);

          return view;
        })
        .catch(this.handleError);
    }
  }

  clearView() {
    this.modifyView(view => {
      view.finalize();
    });
    this.viewPromise = undefined;

    return this;
  }

  render() {
    const { className, style } = this.props;

    return (
      // Create the container Vega draws inside
      <div ref={this.containerRef} className={className} style={style} />
    );
  }
}
