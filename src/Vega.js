import React, { PropTypes } from 'react';
import vg from 'vega';
import { capitalize, isFunction } from './util.js';

const propTypes = {
  spec: PropTypes.object,
  isSpecFixed: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.object,
  viewport: PropTypes.array,
  renderer: PropTypes.string,
  data: PropTypes.object,
};

const defaultProps = {
  isSpecFixed: false,
};

class Vega extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpecFixed: props.isSpecFixed,
      spec: props.spec,
    };
  }

  componentDidMount() {
    this.createVis(this.state.spec);
  }

  componentWillReceiveProps(nextProps) {
    const isSpecFixed = Boolean(nextProps.isSpecFixed);
    const isSpecFixedChange = this.state.isSpecFixed !== isSpecFixed;
    if (isSpecFixedChange) {
      this.setState({ isSpecFixed });
    }

    if (!this.state.isSpecFixed || isSpecFixedChange) {
      if (!Vega.isSameSpec(this.state.spec, nextProps.spec)) {
        this.setState({ spec: nextProps.spec });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.spec !== prevState.spec) {
      this.clearListeners(this.state.spec);
      this.createVis(this.state.spec);
    } else if (this.vis) {
      const props = this.props;
      const spec = this.state.spec;
      let changed = false;

      // update view properties
      [
        'width',
        'height',
        'padding',
        'viewport',
        'renderer',
      ].forEach(field => {
        if (props[field] !== prevProps[field]) {
          this.vis[field](props[field] || spec[field]);
          changed = true;
        }
      });

      // update data
      if (spec.data && props.data) {
        this.vis.update();
        spec.data.forEach(d => {
          const oldData = prevProps.data[d.name];
          const newData = props.data[d.name];
          if (!Vega.isSameData(oldData, newData)) {
            this.updateData(d.name, newData);
          }
        });
      }

      if (changed) {
        this.vis.update();
      }
    }
  }

  componentWillUnmount() {
    this.clearListeners(this.state.spec);
  }

  createVis(spec) {
    if (spec) {
      const props = this.props;
      // Parse the vega spec and create the vis
      vg.parse.spec(spec, chart => {
        const vis = chart({ el: this.element });

        // Attach listeners onto the signals
        if (spec.signals) {
          spec.signals.forEach(signal => {
            vis.onSignal(signal.name, (...args) => {
              const listener = this.props[Vega.listenerName(signal.name)];
              if (listener) {
                listener.apply(this, args);
              }
            });
          });
        }

        // store the vis object to be used on later updates
        this.vis = vis;

        vis
          .width(props.width || spec.width)
          .height(props.height || spec.height)
          .padding(props.padding || spec.padding)
          .viewport(props.viewport || spec.viewport);
        if (props.renderer) {
          vis.renderer(props.renderer);
        }
        if (spec.data && props.data) {
          vis.update();
          spec.data.forEach(d => {
            this.updateData(d.name, props.data[d.name]);
          });
        }
        vis.update();
      });
    } else {
      this.clearListeners(this.state.spec);
      this.vis = null;
    }
    return this;
  }

  updateData(name, value) {
    if (value) {
      if (isFunction(value)) {
        value(this.vis.data(name));
      } else {
        this.vis.data(name)
          .remove(() => true)
          .insert(value);
      }
    }
  }

  // Remove listeners from the signals
  clearListeners(spec) {
    const vis = this.vis;
    if (vis && spec && spec.signals) {
      spec.signals.forEach(signal => vis.offSignal(signal.name));
    }
    return this;
  }

  render() {
    return (
      // Create the container Vega draws inside
      <div ref={c => this.element = c} />
    );
  }
}

Vega.isSameData = function isSameData(a, b) {
  return a === b && !isFunction(a);
};

Vega.isSameSpec = function isSameSpec(a, b) {
  return a === b
    || JSON.stringify(a) === JSON.stringify(b);
};

Vega.listenerName = function listenerName(signalName) {
  return `onSignal${capitalize(signalName)}`;
};

Vega.propTypes = propTypes;
Vega.defaultProps = defaultProps;

export default Vega;
