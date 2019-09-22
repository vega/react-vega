import React, { CSSProperties } from 'react';
import vegaEmbed, { EmbedOptions, VisualizationSpec } from 'vega-embed';
import { ViewListener, View, SignalListeners } from './types';
import shallowEqual from './utils/shallowEqual';
import getUniqueFieldNames from './utils/getUniqueFieldNames';
import { NOOP } from './constants';

export type VegaEmbedProps = {
  className?: string;
  spec: VisualizationSpec;
  signalListeners?: SignalListeners;
  style?: CSSProperties;
  onNewView?: ViewListener;
  onError?: (error: Error) => {};
} & EmbedOptions & {};

export default class VegaEmbed extends React.PureComponent<VegaEmbedProps> {
  containerRef = React.createRef<HTMLDivElement>();

  viewPromise?: Promise<View | undefined>;

  componentDidMount() {
    this.createView();
  }

  componentDidUpdate(prevProps: VegaEmbedProps) {
    const fieldSet = getUniqueFieldNames([this.props, prevProps]) as Set<keyof VegaEmbedProps>;
    fieldSet.delete('className');
    fieldSet.delete('style');
    fieldSet.delete('signalListeners');

    // Only create a new view if necessary
    if (
      Array.from(fieldSet).some(f => this.props[f] !== prevProps[f]) ||
      !shallowEqual(this.props.signalListeners, prevProps.signalListeners)
    ) {
      this.clearView();
      this.createView();
    }
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
    const { spec, onNewView, onError = NOOP, signalListeners = {}, ...options } = this.props;
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

          return view;
        })
        .catch(this.handleError);

      if (onNewView) {
        this.modifyView(onNewView);
      }
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
