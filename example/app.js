import React from 'react';
import NNVisualizer from '../dist';
const Color = require('color');

export const COLORS = [
  Color.hsl([199, 100, 57]),
  Color.hsl([33, 100, 50]),
];

const App = () => (
  <div id="app">
    <NNVisualizer
      width={800}
      height={600}
      lineColor="rgba(0,0,0,0.7)"
      lineWidth="3"
      network={{
        vertical: false,
        layers: [
          {
            units: "1",
            fill: COLORS[0],
            stroke: 'black',
          },
          {
            units: 4,
            fill: COLORS[1],
            stroke: 'black',
          },
          {
            units: 2,
            fill: COLORS[0],
            stroke: 'black',
          },
        ],
      }}
    />
  </div>
);

export default App;
