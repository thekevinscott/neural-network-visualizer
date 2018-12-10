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
    } = this.props;

    const maxCells = layers.reduce((max, layer) => {
      return max < layer.units ? layer.units : max;
    }, 0);

    return (
      <Stage width={width} height={height}>
        <Layer>
          {layers.map((layer, index) => {
            const size = vertical ? height : width;
            const pos = getRange(getPosition(index, size, layers.length), [0, size], [PADDING, size - PADDING]);
            const color = COLORS[index === 0 || index === layers.length - 1 ? 1 : 0];

            return (
              <NNLayer
                key={index}
                maxCells={maxCells}
                layerPosition={pos}
                layerSize={vertical ? width : height}
                color={color}
                vertical={vertical}
                layer={layer}
              />
              );
          })}
        </Layer>
      </Stage>
    );
  }
}

export default NNVisualizer;
