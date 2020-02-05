import React, { CSSProperties } from 'react';
import vegaEmbed, { EmbedOptions, VisualizationSpec } from 'vega-embed';
import { ViewListener, View, SignalListeners } from './types';
import shallowEqual from './utils/shallowEqual';
import getUniqueFieldNames from './utils/getUniqueFieldNames';
import { NOOP } from './constants';
import addSignalListenersToView from './utils/addSignalListenersToView';
import computeSpecChanges from './utils/computeSpecChanges';
import removeSignalListenersFromView from './utils/removeSignalListenersFromView';

export type VegaEmbedProps = {
  className?: string;
  spec: VisualizationSpec;
  signalListeners?: SignalListeners;
  style?: CSSProperties;
  onNewView?: ViewListener;
  onError?: (error: Error) => void;
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
    fieldSet.delete('signalListeners');
    fieldSet.delete('spec');
    fieldSet.delete('style');

    // Only create a new view if necessary
    if (Array.from(fieldSet).some(f => this.props[f] !== prevProps[f])) {
      this.clearView();
      this.createView();
    } else {
      const specChanges = computeSpecChanges(this.props.spec, prevProps.spec);

      const { signalListeners: newSignalListeners } = this.props;
      const { signalListeners: oldSignalListeners } = prevProps;

      if (specChanges) {
        if (specChanges.isExpensive) {
          this.clearView();
          this.createView();
        } else {
          const areSignalListenersChanged = !shallowEqual(newSignalListeners, oldSignalListeners);
          this.modifyView(view => {
            if (specChanges.width !== false) {
              view.width(specChanges.width);
            }
            if (specChanges.height !== false) {
              view.height(specChanges.height);
            }
            if (areSignalListenersChanged) {
              if (oldSignalListeners) {
                removeSignalListenersFromView(view, oldSignalListeners);
              }
              if (newSignalListeners) {
                addSignalListenersToView(view, newSignalListeners);
              }
            }

            view.run();
          });
        }
      } else {
        const areSignalListenersChanged = !shallowEqual(newSignalListeners, oldSignalListeners);
        this.modifyView(view => {
          if (areSignalListenersChanged) {
            if (oldSignalListeners) {
              removeSignalListenersFromView(view, oldSignalListeners);
            }
            if (newSignalListeners) {
              addSignalListenersToView(view, newSignalListeners);
            }
          }

          view.run();
        });
      }
    }
  }

  componentWillUnmount() {
    this.clearView();
  }

  handleError = (error: Error): undefined => {
    const { onError = NOOP } = this.props;
    onError(error);
    // eslint-disable-next-line no-console
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
    const { spec, onNewView, signalListeners = {}, ...options } = this.props;
    if (this.containerRef.current) {
      this.viewPromise = vegaEmbed(this.containerRef.current, spec, options)
        .then(({ view }) => {
          if (addSignalListenersToView(view, signalListeners)) {
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
