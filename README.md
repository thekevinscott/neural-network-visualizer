# Neural Network Visualizer

This is an ES6 component for rendering Neural Network visualizations. It relies on [roughjs](https://roughjs.com).

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
* `network` - A network definition, defined below

### `network`
* `vertical` - An optional boolean denoting whether the network is vertical or not
* `layers` - An array of `Layer` objects`
* `diameter` - The default diameter of a cell.
* `fill` - The default fill color for a cell
* `fillWeight` - The default fill weight for a cell, where relevant
* `fillStyle` - The default fill style to use for the cell
* `strokeWidth` - The default stroke width for lines and cells
* `lineWidth` - The line style to use for the cell. Overrides `strokeWidth`
* `roughness` - The default roughness to use
* `bowing` - The amount of bowing to use

### `layer`

* `units` - The number of units in the layer
* `diameter` - The radius of the neuron. Overrides network-set variable.
* `fill` - The fill color for the cell. Overrides network-set variable.
* `fillWeight` - The fill weight for the cell, where relevant. Overrides network-set variable.
* `fillStyle` - The fill style to use for the cell. Overrides network-set variable.
* `strokeWidth` - The stroke style to use for the cell. Overrides network-set variable.
* `lineWidth` - The stroke style to use for the cell. Overrides `strokeWidth` set on the layer.
* `roughness` - The default roughness to use. Overrides network-set variable.
* `bowing` - The amount of bowing to use. Overrides network-set variable.

Line definitions in the first layer will be discarded; layer definitions work backwards, so the second layer's definition will be used for the line connecting the first and second layers.

## License

[MIT](https://github.com/thekevinscott/neural-network-visualizer/blob/master/LICENSE)
