import React, { PropTypes } from 'react';
import vg from 'vega';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function listenerName(signalName){
  return `onSignal${capitalize(signalName)}`;
}

function isFunction(functionToCheck){
  var getType = {};
  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function createClassFromSpec(name, spec){
  spec = isFunction(spec) ? spec() : spec;

  let propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object,
    viewport: PropTypes.array,
    renderer: PropTypes.string,
    data: PropTypes.any
  };
  if(spec.signals){
    spec.signals.forEach(signal => {
      propTypes[listenerName(signal.name)] = PropTypes.func;
    });
  }

  return React.createClass({
    displayName: name,
    propTypes: propTypes,
    getDefaultProps(){
      return {
        width: spec.width,
        height: spec.height,
        padding: spec.padding,
        viewport: null,
        renderer: 'svg'
      };
    },
    componentDidMount(){
      const self = this;

      // Parse the vega spec and create the vis
      vg.parse.spec(spec, chart => {
        const vis = chart({ el: this.refs.chartContainer });

        // Attach listeners onto the signals
        if(spec.signals){
          spec.signals.forEach(signal => {
            vis.onSignal(signal.name, function(...args){
              const listener = self.props[listenerName(signal.name)];
              if(listener){
                listener.apply(self, args);
              }
            });
          });
        }

        const props = self.props;
        vis
          .width(props.width)
          .height(props.height)
          .padding(props.padding)
          .viewport(props.viewport)
          .renderer(props.renderer);
        self.updateData(vis);
        vis.update();

        // store the vis object to be used on later updates
        self.vis = vis;
      });
    },
    componentDidUpdate(){
      const vis = this.vis;
      if(vis){
        const props = this.props;
        vis
          .width(props.width)
          .height(props.height)
          .padding(props.padding)
          .viewport(props.viewport)
          .renderer(props.renderer);
        this.updateData(vis);
        vis.update();
      }
    },
    componentWillUnmount(){
      const vis = this.vis;
      // Remove listeners from the signals
      if(vis && spec.signals){
        spec.signals.forEach(signal => vis.offSignal(signal.name));
      }
    },
    updateData(vis){
      const props = this.props;
      if(spec.data){
        spec.data.forEach(d => {
          vis.data(d.name).remove(()=>true);
          if(props.data && props.data[d.name]){
            vis.data(d.name).insert(props.data[d.name]);
          }
        });
      }
      return vis;
    },
    // dummy render method that creates the container vega draws inside
    render(){
      return (
        <div ref="chartContainer"></div>
      );
    }
  });
};