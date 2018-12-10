import React from 'react';
import NNVisualizer from '../dist';

const App = () => (
  <div id="app">
    <NNVisualizer
      width={800}
      height={600}
      network={{
        vertical: false,
        layers: [
          {
            units: 3,
          },
          {
            units: 4,
          },
          // {
          //   units: 6,
          // },
          {
            units: 1,
          },
          {
            units: 2,
          },
        ],
      }}
    />
  </div>
);

export default App;
