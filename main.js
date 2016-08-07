const barData = {
  table: [
    {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
    {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
    {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
    {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
    {"x": 9,  "y": 52}, {"x": 10, "y": 48},
    {"x": 11, "y": 24}, {"x": 12, "y": 49},
    {"x": 13, "y": 87}, {"x": 14, "y": 66},
    {"x": 15, "y": 17}, {"x": 16, "y": 27},
    {"x": 17, "y": 68}, {"x": 18, "y": 16},
    {"x": 19, "y": 49}, {"x": 20, "y": 15}
  ]
};

const barSpec = {
  "width": 400,
  "height": 140,
  "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
  "data": [{ "name": "table" }],
  'signals': [
    {
      'name': 'hover', 'init': null,
      'streams': [
        {'type': '@bar:mouseover', 'expr': 'datum'},
        {'type': '@bar:mouseout', 'expr': 'null'}
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "ordinal",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": {"data": "table", "field": "y"},
      "nice": true
    }
  ],
  "axes": [
    {"type": "x", "scale": "x"},
    {"type": "y", "scale": "y"}
  ],
  "marks": [
    {
      "type": "rect",
      "name": "bar",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "x": {"scale": "x", "field": "x"},
          "width": {"scale": "x", "band": true, "offset": -1},
          "y": {"scale": "y", "field": "y"},
          "y2": {"scale": "y", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ]
};

const spec2 = {
  "width": 400,
  "height": 140,
  "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
  "data": [{ "name": "table" }],
  'signals': [
    {
      'name': 'hover', 'init': null,
      'streams': [
        {'type': '@bar:mouseover', 'expr': 'datum'},
        {'type': '@bar:mouseout', 'expr': 'null'}
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": {"data": "table", "field": "y"},
      "nice": true
    }
  ],
  "axes": [
    {"type": "x", "scale": "x"},
    {"type": "y", "scale": "y"}
  ],
  "marks": [
    {
      "type": "symbol",
      "name": "bar",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "x": {"scale": "x", "field": "x"},
          "y": {"scale": "y", "field": "y"},
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ]
};

const Vega = ReactVega.default;
const BarChart = ReactVega.createClassFromSpec(barSpec);

const code1 = `<Vega data={this.state.data} spec={this.state.spec} onSignalHover={this.handleHover} />`;

const code2 = `const BarChart = ReactVega.createClassFromSpec(barSpec);
<BarChart data={this.state.data} onSignalHover={this.handleHover} />`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      spec: barSpec,
      data: barData
    };

    this.handleHover = this.handleHover.bind(this);
    this.toggleSpec = this.toggleSpec.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  handleHover(...args) {
    this.setState({
      info: JSON.stringify(args)
    });
  }

  toggleSpec() {
    if(this.state.spec === barSpec) {
      this.setState({ spec: spec2 });
    } else {
      this.setState({ spec: barSpec });
    }
  }

  updateData() {
    const table = [];
    for(let i = 1; i <= 20; i++) {
      table.push({
        x: i,
        y: Math.random() * 100
      });
    }
    this.setState({
      data: { table }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleSpec}>Toggle Spec</button>
        <button onClick={this.updateData}>Update data</button>
        <h3><code>&lt;Vega&gt;</code> React Component</h3>
        Will recompile when spec changes and update when data changes.
        <pre>{code1}</pre>
        <Vega data={this.state.data} spec={this.state.spec} onSignalHover={this.handleHover}/>
        <h3><code>ReactVega.createClassFromSpec()</code></h3>
        Use the given spec to create a reusable component.
        <pre>{code2}</pre>
        <BarChart data={this.state.data} onSignalHover={this.handleHover}/>
        {this.state.info}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
