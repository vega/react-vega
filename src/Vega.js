import React, { PropTypes } from 'react';
import vg from 'vega';
import {capitalize, isFunction} from './util.js';

function listenerName(signalName) {
  return `onSignal${capitalize(signalName)}`;
}

function readSpec(spec) {
  return isFunction(spec) ? spec() : spec;
}

const propTypes = {
  spec: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.object,
  viewport: PropTypes.array,
  renderer: PropTypes.string,
  data: PropTypes.object,
};

class Vega extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spec: readSpec(this.props.spec)
    };
  }

  componentDidMount() {
    this._initialize(this.state.spec);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isSpecFixed) {
      const newSpec = readSpec(nextProps.spec);
      const newSpecString = JSON.stringify(newSpec);
      const isNewSpec = this.state.specString !== newSpecString;

      if (isNewSpec) {
        this._clearListeners(this.state.vis, this.state.spec);
        this._initialize(newSpec);
      }

      this.setState({ isNewSpec });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isNewSpec) {
      this._update(this.state.vis, this.state.spec);
    }
  }

  componentWillUnmount() {
    this._clearListeners(this.state.vis, this.state.spec);
  }

  _initialize(spec) {
    const self = this;

    // Parse the vega spec and create the vis
    vg.parse.spec(spec, chart => {
      const vis = chart({ el: self.refs.chartContainer });

      // Attach listeners onto the signals
      if (spec.signals) {
        spec.signals.forEach(signal => {
          vis.onSignal(signal.name, function (...args) {
            const listener = self.props[listenerName(signal.name)];
            if (listener) {
              listener.apply(self, args);
            }
          });
        });
      }

      self._update(vis, spec);
      // store the vis object to be used on later updates
      if (self.props.isSpecFixed) {
        self.setState({ vis, spec });
      }
      else {
        const specString = JSON.stringify(spec);
        self.setState({ vis, spec, specString });
      }
    });
  }

  _clearListeners(vis, spec) {
    // Remove listeners from the signals
    if (vis && spec && spec.signals) {
      spec.signals.forEach(signal => vis.offSignal(signal.name));
    }
  }

  _update(vis, spec) {
    const props = this.props;
    if (vis && spec) {
      vis
        .width(props.width || spec.width)
        .height(props.height || spec.height)
        .padding(props.padding || spec.padding)
        .viewport(props.viewport || spec.viewport);
      if (props.renderer) {
        vis.renderer(props.renderer);
      }
      this._updateData(vis, spec);
      vis.update();
    }
  }

  _updateData(vis, spec) {
    // TODO: Can check if data changes
    const props = this.props;
    if (vis && spec && spec.data && props.data) {
      vis.update();
      spec.data.forEach(d => {
        const newData = props.data[d.name];
        if (newData) {
          if (isFunction(newData)) {
            newData(vis.data(d.name));
          }
          else {
            vis.data(d.name)
              .remove(() => true)
              .insert(newData);
          }
        }
      });
    }
  }

  render() {
    return (
      // Create the container Vega draws inside
      <div ref="chartContainer" />
    );
  }
}

Vega.listenerName = listenerName;
Vega.readSpec = readSpec;
Vega.propTypes = propTypes;

export default Vega;

