import * as vega from 'vega';

import React from 'react';
import PropTypes from 'prop-types';
import { capitalize, isDefined, isFunction } from './util.js';

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  spec: PropTypes.object.isRequired,
  logLevel: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  background: PropTypes.string,
  padding: PropTypes.object,
  renderer: PropTypes.string,
  enableHover: PropTypes.bool,
  data: PropTypes.object,
  onNewView: PropTypes.func,
  onCompileError: PropTypes.func,
};

const defaultProps = {
  className: '',
  renderer: 'svg',
  enableHover: true,
  onNewView() {},
  onCompileError() {},
};

class Vega extends React.Component {

  static isSamePadding(a, b) {
    if (isDefined(a) && isDefined(b)) {
      return a.top === b.top
        && a.left === b.left
        && a.right === b.right
        && a.bottom === b.bottom;
    }
    return a === b;
  }

  static isSameData(a, b) {
    return a === b && !isFunction(a);
  }

  static isSameSpec(a, b) {
    return a === b
      || JSON.stringify(a) === JSON.stringify(b);
  }

  static listenerName(signalName) {
    return `onSignal${capitalize(signalName)}`;
  }

  componentDidMount() {
    this.createView(this.props.spec);
  }

  componentDidUpdate(prevProps) {
    if (this.props.spec !== prevProps.spec) {
      this.clearView();
      this.createView(this.props.spec);
    } else if (this.view) {
      const props = this.props;
      const spec = this.props.spec;
      let changed = false;

      // update view properties
      [
        'width',
        'height',
        'renderer',
        'logLevel',
        'background',
      ]
        .filter(field => props[field] !== prevProps[field])
        .forEach((field) => {
          this.view[field](props[field]);
          changed = true;
        });

      if (!Vega.isSamePadding) {
        this.view.padding(props.padding || spec.padding);
        changed = true;
      }

      // update data
      if (spec.data && props.data) {
        spec.data.forEach((d) => {
          const oldData = prevProps.data[d.name];
          const newData = props.data[d.name];
          if (!Vega.isSameData(oldData, newData)) {
            this.updateData(d.name, newData);
            changed = true;
          }
        });
      }

      if (props.enableHover !== prevProps.enableHover) {
        changed = true;
      }

      if (changed) {
        if (props.enableHover) {
          this.view.hover();
        }
        this.view.run();
      }
    }
  }

  componentWillUnmount() {
    this.clearView();
  }

  createView(spec) {
    if (spec) {
      const props = this.props;
      // Parse the vega spec and create the view
      try {
        const runtime = vega.parse(spec);
        const view = new vega.View(runtime)
          .initialize(this.element);

        // Attach listeners onto the signals
        if (spec.signals) {
          spec.signals.forEach((signal) => {
            view.addSignalListener(signal.name, (...args) => {
              const listener = this.props[Vega.listenerName(signal.name)];
              if (listener) {
                listener.apply(this, args);
              }
            });
          });
        }

        // store the vega.View object to be used on later updates
        this.view = view;

        [
          'width',
          'height',
          'padding',
          'renderer',
          'logLevel',
          'background',
        ]
          .filter(field => isDefined(props[field]))
          .forEach((field) => { view[field](props[field]); });

        if (spec.data && props.data) {
          spec.data
            .filter(d => props.data[d.name])
            .forEach((d) => {
              this.updateData(d.name, props.data[d.name]);
            });
        }
        if (props.enableHover) {
          view.hover();
        }
        view.run();

        props.onNewView(view);
      } catch (ex) {
        this.clearView();
        props.onCompileError(ex);
      }
    } else {
      this.clearView();
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
          vega.changeset()
            .remove(() => true)
            .insert(value),
        );
      }
    }
  }

  clearView() {
    if (this.view) {
      this.view.finalize();
      this.view = null;
    }
    return this;
  }

  render() {
    return (
      // Create the container Vega draws inside
      <div
        ref={(c) => { this.element = c; }}
        className={this.props.className}
        style={this.props.style}
      />
    );
  }

}

Vega.propTypes = propTypes;
Vega.defaultProps = defaultProps;

export default Vega;
