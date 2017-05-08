import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import data1 from './vega/data1.json';
import spec1 from './vega/spec1';
import spec2 from './vega/spec2';
import Vega, { createClassFromSpec } from '../../src/index.js';

const BarChart = createClassFromSpec(spec1);

const code1 = `<Vega data={this.state.data} spec={this.state.spec} onSignalHover={this.handleHover} />`;

const code2 = `const BarChart = ReactVega.createClassFromSpec(barSpec);
<BarChart data={this.state.data} onSignalHover={this.handleHover} />`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      spec: spec1,
      data: data1,
    };

    this.handleHover = this.handleHover.bind(this);
    this.toggleSpec = this.toggleSpec.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  handleHover(...args) {
    console.log('args', args);
    this.setState({
      info: JSON.stringify(args)
    });
  }

  toggleSpec() {
    if (this.state.spec === spec1) {
      this.setState({ spec: spec2 });
    } else {
      this.setState({ spec: spec1 });
    }
  }

  updateData() {
    const table = [];
    for (let i = 1; i <= 20; i++) {
      table.push({
        category: String.fromCharCode(65 + i),
        amount: Math.round(Math.random() * 100),
      });
    }
    this.setState({ data: { table } });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleSpec}>Toggle Spec</button>
        <button onClick={this.updateData}>Update data</button>
        <h3><code>&lt;Vega&gt;</code> React Component</h3>
        Will recompile when spec changes and update when data changes.
        <pre>{code1}</pre>
        <Vega
          data={this.state.data}
          spec={this.state.spec}
          onSignalTooltip={this.handleHover}
        />
        <h3><code>ReactVega.createClassFromSpec()</code></h3>
        Use the given spec to create a reusable component.
        <pre>{code2}</pre>
        <BarChart
          data={this.state.data}
          onSignalTooltip={this.handleHover}
        />
        {this.state.info}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
