import React from 'react';
import { action } from '@storybook/addon-actions';
import { VegaLite, createClassFromSpec } from '../../react-vega/src';

const data1 = {
  myData: [
    { a: 'A', b: 20 },
    { a: 'B', b: 34 },
    { a: 'C', b: 55 },
    { a: 'D', b: 19 },
    { a: 'E', b: 40 },
    { a: 'F', b: 34 },
    { a: 'G', b: 91 },
    { a: 'H', b: 78 },
    { a: 'I', b: 25 },
  ],
};

const data2 = {
  myData: [
    { a: 'A', b: 28 },
    { a: 'B', b: 55 },
    { a: 'C', b: 43 },
    { a: 'D', b: 91 },
    { a: 'E', b: 81 },
    { a: 'F', b: 53 },
    { a: 'G', b: 19 },
    { a: 'H', b: 87 },
    { a: 'I', b: 52 },
  ],
};

const spec1 = {
  data: { name: 'myData' },
  description: 'A simple bar chart with embedded data.',
  encoding: {
    x: { field: 'a', type: 'ordinal' },
    y: { field: 'b', type: 'quantitative' },
  },
  mark: 'bar',
};

const spec2 = {
  data: { name: 'myData' },
  description: 'A simple bar chart with embedded data.',
  encoding: {
    x: { field: 'b', type: 'quantitative' },
    y: { field: 'a', type: 'ordinal' },
  },
  mark: 'bar',
};

const BarChart = createClassFromSpec({ mode: 'vega-lite', spec: spec1 });

const code1 = `<VegaLite data={this.state.data} spec={this.state.spec} />`;

const code2 = `const BarChart = ReactVegaLite.createClassFromLiteSpec(spec1);
<BarChart data={this.state.data} />`;

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data1,
      info: '',
      spec: spec1,
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleToggleSpec = this.handleToggleSpec.bind(this);
    this.handleUpdateData = this.handleUpdateData.bind(this);
    this.handlers = { hover: this.handleHover };
  }

  handleHover(...args) {
    action('hover', {
      limit: 5,
    })(args);
    this.setState({
      info: JSON.stringify(args),
    });
  }

  handleToggleSpec() {
    const { spec } = this.state;
    action('toggle spec')(spec);
    if (spec === spec1) {
      this.setState({ spec: spec2 });
    } else {
      this.setState({ spec: spec1 });
    }
  }

  handleUpdateData() {
    const { data } = this.state;
    action('update data')(data);
    if (data === data1) {
      this.setState({ data: data2 });
    } else if (data === data2) {
      this.setState({ data: data1 });
    }
  }

  render() {
    const { data, spec, info } = this.state;

    return (
      <div>
        <div style={{ float: 'right' }}>
          <iframe
            title="star"
            src="https://ghbtns.com/github-btn.html?user=vega&repo=react-vega&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="100px"
            height="20px"
          />
        </div>
        <button type="button" onClick={this.handleToggleSpec}>
          Toggle Spec
        </button>
        <button type="button" onClick={this.handleUpdateData}>
          Update data
        </button>
        <p>Active spec</p>
        <pre>{spec}</pre>
        <h3>
          <code>&lt;VegaLite&gt;</code> React Component
        </h3>
        Will recompile when spec changes and update when data changes.
        <pre>{code1}</pre>
        <VegaLite data={data} spec={spec} signalListeners={this.handlers} />
        <h3>
          <code>ReactVegaLite.createClassFromLiteSpec()</code>
        </h3>
        Use the given spec to create a reusable component.
        <pre>{code2}</pre>
        <BarChart data={data} signalListeners={this.handlers} />
        {info}
      </div>
    );
  }
}
