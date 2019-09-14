import React from 'react';
import vegaEmbed, { EmbedOptions, VisualizationSpec, Result } from 'vega-embed';

export type VegaEmbedProps = {
  className?: string;
  spec: VisualizationSpec;
  signalHandlers: {
    [key: string]: (name: string, value: any) => void;
  };
  style?: { [key: string]: any };
  onNewView?: (view: Result['view']) => {};
  onError?: (error: Error) => {};
} & EmbedOptions & {};

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

  viewPromise?: Promise<Result['view'] | undefined>;

  createView() {
    const { spec, onNewView = NOOP, onError = NOOP, signalHandlers = {}, ...options } = this.props;
    if (this.containerRef.current) {
      this.viewPromise = vegaEmbed(this.containerRef.current, spec, options).then(
        ({ view }) => {
          if (typeof spec !== 'string' && 'signals' in spec && spec.signals) {
            spec.signals.forEach(signal => {
              view.addSignalListener(signal.name, (...args) => {
                const listener = signalHandlers[signal.name];
                if (listener) {
                  listener.apply(this, args);
                }
              });
            });
            view.run();
          }
          onNewView(view);

          return view;
        },
        reason => {
          onError(reason);
        },
      );
    }
  }

  clearView() {
    if (this.viewPromise) {
      this.viewPromise
        .then(view => {
          if (view) {
            view.finalize();
          }

          return true;
        })
        .catch(NOOP);
      this.viewPromise = null;
    }

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
