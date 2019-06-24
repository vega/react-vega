/* eslint-disable no-magic-numbers */
import React from 'react';
import Vega, { createClassFromSpec } from '../packages/react-vega/src';
import data1 from './vega/data1.json';
import spec1 from './vega/spec1';
import spec2 from './vega/spec2';
import option1 from './vega/option1';

const BarChart = createClassFromSpec(spec1);

const code1 = `<Vega data={this.state.data} spec={this.state.spec} onSignalHover={this.handleHover} />`;

const code2 = `const BarChart = ReactVega.createClassFromSpec(barSpec);
<BarChart data={this.state.data} onSignalHover={this.handleHover} />`;

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data1,
      info: '',
      option: option1,
      spec: spec1,
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleToggleSpec = this.handleToggleSpec.bind(this);
    this.handleUpdateData = this.handleUpdateData.bind(this);
  }

  handleHover(...args) {
    console.log('YOOOOOOO');
    this.setState({
      info: JSON.stringify(args),
    });
  }

  handleToggleSpec() {
    const { spec } = this.state;
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
    this.setState({ data: { table } });
  }

  render() {
    const { data, spec, info, option } = this.state;

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
        <h3>
          <code>&lt;Vega&gt;</code> React Component
        </h3>
        Will recompile when spec changes and update when data changes.
        <pre>{code1}</pre>
        <Vega data={data} spec={spec} onSignalTooltip={this.handleHover} embedOption={option} />
        <h3>
          <code>ReactVega.createClassFromSpec()</code>
        </h3>
        Use the given spec to create a reusable component.
        <pre>{code2}</pre>
        <BarChart data={data} onSignalTooltip={this.handleHover} />
        {info}
      </div>
    );
  }
}
