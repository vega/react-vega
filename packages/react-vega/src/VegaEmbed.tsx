import React from 'react';
import vegaEmbed, { EmbedOptions, VisualizationSpec, Result } from 'vega-embed';

export type VegaEmbedProps = {
  className?: string;
  spec: VisualizationSpec;
  signalHandlers?: {
    [key: string]: (name: string, value: any) => void;
  };
  style?: { [key: string]: any };
  onNewView?: (view: Result['view']) => {};
  onError?: (error: Error) => {};
} & EmbedOptions & {};

const NOOP = () => {};

export default class VegaEmbed extends React.PureComponent<VegaEmbedProps> {
  containerRef = React.createRef<HTMLDivElement>();

  viewPromise?: Promise<Result['view'] | undefined>;

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

  createView() {
    const { spec, onNewView = NOOP, onError = NOOP, signalHandlers = {}, ...options } = this.props;
    if (this.containerRef.current) {
      this.viewPromise = vegaEmbed(this.containerRef.current, spec, options).then(
        ({ view }) => {
          const signalNames = Object.keys(signalHandlers);
          signalNames.forEach(signalName => {
            try {
              view.addSignalListener(signalName, signalHandlers[signalName]);
            } catch (ex) {
              console.warn('Cannot add invalid signal handler >>', ex);
            }
          });
          if (signalNames.length > 0) {
            view.run();
          }
          onNewView(view);

          return view;
        },
        reason => {
          onError(reason);

          return undefined;
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
      this.viewPromise = undefined;
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
