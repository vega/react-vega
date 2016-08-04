console.log('Hi!', ReactVega);

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
  "height": 200,
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

const Vega = ReactVega.default;
const BarChart = ReactVega.createClassFromSpec('BarChart', barSpec);

function handleHover(...args){
  const info = JSON.stringify(args);
  document.getElementById('bar-tip').innerHTML = info;
}

ReactDOM.render(
  <div>
    <h3>created with <code>&lt;Vega /&gt;</code></h3>
    <Vega data={barData} spec={barSpec} onSignalHover={handleHover}/>
    <h3>created with <code>ReactVega.createClassFromSpec()</code></h3>
    <BarChart data={barData} onSignalHover={handleHover}/>
  </div>,
  document.getElementById('bar-container')
);
