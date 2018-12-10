# Neural Network Visualizer

This is a React component for generating Neural Network visualizations.

![A sample output](https://raw.githubusercontent.com/thekevinscott/neural-network-visualizer/master/example/sample.png)

[Live demo](https://thekevinscott.github.io/neural-network-visualizer/)

## Install

```
yarn add neural-network-visualizer
```

## Quick Start

```
import React from 'react';
import ReactDOM from 'react-dom';
import NNVisualizer from 'neural-network-visualizer';

ReactDOM.render(<NNVisualizer
  width={800}
  height={600}
  network={{
    layers: [
      {
        units: 3,
      },
      {
        units: 4,
      },
      {
        units: 2,
      },
    ],
  }}
/>, document.body);
```

## API

* `width` - The width of the visualizatoin
* `height` - The height of the visualization
* `network.vertical` - An optional boolean denoting whether the network is vertical or not
* `network.layers` - An array of `Layer` objects`

### `Layer`

* `units` - The number of units in the layer

## License

[MIT](https://github.com/thekevinscott/neural-network-visualizer/blob/master/LICENSE)
