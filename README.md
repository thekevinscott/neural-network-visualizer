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
  lineColor="black"
  lineWidth="5"
  network={{
    vertical: false,
    layers: [
      {
        units: 3,
      },
      {
        units: 4,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 10,
        radius: 30,
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
* `lineColor` - The color of a line
* `lineWidth` - The stroke width of a line
* `network` - A network definition, defined below

### `network`
* `vertical` - An optional boolean denoting whether the network is vertical or not
* `layers` - An array of `Layer` objects`

### `layer`

* `units` - The number of units in the layer
* `radius` - The radius of the neuron
* `fill` - The fill color
* `stroke` - The stroke color
* `strokeWidth` - The width of the stroke

## License

[MIT](https://github.com/thekevinscott/neural-network-visualizer/blob/master/LICENSE)
