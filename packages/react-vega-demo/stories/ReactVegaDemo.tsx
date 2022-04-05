/* eslint-disable no-magic-numbers */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Vega, createClassFromSpec, VisualizationSpec } from '../../react-vega/src';
import data1 from './vega/data1';
import spec1 from './vega/spec1';
import spec2 from './vega/spec2';

const BarChart = createClassFromSpec({ spec: spec1 });

const code1 = `<Vega data={this.state.data} spec={this.state.spec} onSignalHover={this.handleHover} />`;

const code2 = `const BarChart = ReactVega.createClassFromSpec(barSpec);
<BarChart data={this.state.data} onSignalHover={this.handleHover} />`;

type State = {
  data: Record<string, unknown>;
  info: string;
  spec: VisualizationSpec;
};

export default class Demo extends React.PureComponent<{}, State> {
  handlers: {
    tooltip: (...args: unknown[]) => void;
  };

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
    this.handleErrorSpec = this.handleErrorSpec.bind(this);
    this.handlers = { tooltip: this.handleHover };
  }

  handleHover(...args) {
    action('hover', {
      limit: 5,
    })(args);
    this.setState({
      info: JSON.stringify(args),
    });
  }

  handleErrorSpec() {
    const spec: VisualizationSpec = {
      signals: [
        { name: 'foo' },
        { name: 'foo' }, // create error: Duplicate signal name
      ],
    };
    action('error spec')(spec);
    this.setState({ spec });
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
    const table = [];
    for (let i = 1; i <= 20; i += 1) {
      table.push({
        amount: Math.round(Math.random() * 100),
        category: String.fromCharCode(65 + i),
      });
    }
    action('update data')(table);
    this.setState({ data: { table } });
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
        <button type="button" onClick={this.handleErrorSpec}>
          Spec Error
        </button>
        <h3>
          <code>&lt;Vega&gt;</code> React Component
        </h3>
        Will recompile when spec changes and update when data changes.
        <pre>{code1}</pre>
        <Vega
          data={data}
          spec={spec}
          signalListeners={this.handlers}
          onError={(e, div) => {
            /* eslint-disable-next-line no-param-reassign */
            div.innerText = `${e.name}: ${e.message}`;
          }}
        />
        <h3>
          <code>ReactVega.createClassFromSpec()</code>
        </h3>
        Use the given spec to create a reusable component.
        <pre>{code2}</pre>
        <BarChart data={data} signalListeners={this.handlers} />
        <div>
          Hover info: <code>{info}</code>
        </div>
      </div>
    );
  }
}
