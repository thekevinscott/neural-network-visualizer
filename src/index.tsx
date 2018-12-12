import * as React from 'react';
import {
  Stage,
  Layer,
} from 'react-konva';
import * as Konva from 'konva';
import NNLayer from './Layer';
import {
  COLORS,
  PADDING,
} from './config';

import {
  INetwork,
  ILayer,
} from './types';

import getPosition from './getPosition';
import getRange from './getRange';

interface IProps {
  width: number;
  height: number;
  network: INetwork;
  lineColor?: string;
}

class NNVisualizer extends React.Component<IProps> {
  render() {
    const {
      width,
      height,
      network: {
        vertical,
        layers,
      },
      ...props,
    } = this.props;

    const maxCells = layers.reduce((max, layer) => {
      return max < layer.units ? layer.units : max;
    }, 0);


    const {
      lines,
      cells,
    } = getChildren(layers, {
      vertical,
      width,
      height,
      maxCells,
      ...props,
    });

    return (
      <Stage width={width} height={height}>
        <Layer>
          {lines}
          {cells}
        </Layer>
      </Stage>
    );
  }
}

const getChildren = (layers, {
  vertical,
  width,
  height,
  maxCells,
  ...props,
}) => {
  let allLines = [];
  let allCells = [];
  const size = vertical ? height : width;
  let previousLayerCells = null;

  layers.map((layer, index) => {
    const layerPosition = getRange(getPosition(index, size, layers.length), [0, size], [PADDING, size - PADDING]);

    const {
      cells,
      Component,
      lines,
    } = NNLayer({
      layerPosition,
      maxCells,
      layerSize: vertical ? width : height,
      vertical,
      layer,
      previousLayerCells,
      ...props,
    });

    previousLayerCells = cells;
    allLines = allLines.concat(lines);
    allCells = allCells.concat((
      <Component />
    ));
  })

  return {
    lines: allLines,
    cells: allCells,
  }
};

export default NNVisualizer;
