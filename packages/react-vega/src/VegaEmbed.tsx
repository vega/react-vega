import React, { CSSProperties } from 'react';
import vegaEmbed, { EmbedOptions, Result, VisualizationSpec } from 'vega-embed';
import { ViewListener, SignalListeners } from './types';
import shallowEqual from './utils/shallowEqual';
import getUniqueFieldNames from './utils/getUniqueFieldNames';
import { NOOP } from './constants';
import addSignalListenersToView from './utils/addSignalListenersToView';
import computeSpecChanges from './utils/computeSpecChanges';
import removeSignalListenersFromView from './utils/removeSignalListenersFromView';
import combineSpecWithDimension from './utils/combineSpecWithDimension';

export type VegaEmbedProps = {
  className?: string;
  spec: VisualizationSpec;
  signalListeners?: SignalListeners;
  style?: CSSProperties;
  onNewView?: ViewListener;
  onError?: (error: Error) => void;
} & EmbedOptions;

export default class VegaEmbed extends React.PureComponent<VegaEmbedProps> {
  containerRef = React.createRef<HTMLDivElement>();

  result?: Result | undefined;

  componentDidMount() {
    this.createView();
  }

  componentDidUpdate(prevProps: VegaEmbedProps) {
    const fieldSet = getUniqueFieldNames([this.props, prevProps]) as Set<keyof VegaEmbedProps>;
    fieldSet.delete('className');
    fieldSet.delete('signalListeners');
    fieldSet.delete('spec');
    fieldSet.delete('style');
    fieldSet.delete('width');
    fieldSet.delete('height');

    // Only create a new view if necessary
    if (Array.from(fieldSet).some((f) => this.props[f] !== prevProps[f])) {
      this.clearView();
      this.createView();
    } else {
      const specChanges = computeSpecChanges(
        combineSpecWithDimension(this.props),
        combineSpecWithDimension(prevProps),
      );

      const { signalListeners: newSignalListeners } = this.props;
      const { signalListeners: oldSignalListeners } = prevProps;

      if (specChanges) {
        if (specChanges.isExpensive) {
          this.clearView();
          this.createView();
        } else {
          const areSignalListenersChanged = !shallowEqual(newSignalListeners, oldSignalListeners);
          this.modifyView((view) => {
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
      } else if (!shallowEqual(newSignalListeners, oldSignalListeners)) {
        this.modifyView((view) => {
          if (oldSignalListeners) {
            removeSignalListenersFromView(view, oldSignalListeners);
          }
          if (newSignalListeners) {
            addSignalListenersToView(view, newSignalListeners);
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
    try {
      if (this.result) {
        const { view } = this.result;
        if (view) {
          action(view);
        }
        return true;
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  createView = async () => {
    const { spec, onNewView, signalListeners = {}, width, height, ...options } = this.props;
    try {
      if (this.containerRef.current) {
        const finalSpec = combineSpecWithDimension(this.props);
        this.result = await vegaEmbed(this.containerRef.current, finalSpec, options);

        if (addSignalListenersToView(this.result.view, signalListeners)) {
          this.result.view.run();
        }
        if (onNewView) {
          this.modifyView(onNewView);
        }
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  clearView = () => {
    if (this.result) {
      this.result.finalize();
    }
    this.result = undefined;

    return this;
  };

  render() {
    const { className, style } = this.props;

    // Create the container Vega draws inside
    return <div ref={this.containerRef} className={className} style={style} />;
  }
}
