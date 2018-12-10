import * as React from 'react';
import {
  Circle,
} from 'react-konva';
import Cell from './Cell';
import * as Konva from 'konva';
import {
  COLORS,
  PADDING,
} from './config';
import getPos from './getPosition';
import getRange from './getRange';

import {
  ILayer,
} from './types';

interface IProps {
  layer: ILayer;
  vertical?: boolean;
  layerPosition: number;
  color: any;
  layerSize: number;
  maxCells: number;
}

const Layer:React.SFC<IProps> = ({
  layer,
  vertical,
  color,
  layerPosition,
  layerSize,
  maxCells,
}) => (
  <>
    {(Array(layer.units) as any).fill('').map((_: any, i:number) => {
      const fill = color.toString();
      const stroke = color.darken(0.8).toString();
      return (
        <Cell
          fill={fill}
          stroke={stroke}
          {...getPosition({
            maxCells,
            i,
            layerPosition,
            layerSize,
            vertical,
            units: layer.units,
          })}
          radius={40}
        />
      );
    })}
  </>
);

const getPosition = ({
  maxCells,
  vertical,
  i,
  layerPosition,
  layerSize,
  units,
}: {
  maxCells: number;
  i: number;
  vertical?: boolean;
  layerPosition: number,
  layerSize: number;
  units: number;
}) => {
  const extraAmount = 1200 / (maxCells ** 2);
  const extraPadding = extraAmount * (maxCells - units);
  const pad = PADDING + extraPadding;
  const position = getRange(getPos(i, layerSize, units), [0, layerSize], [pad, layerSize - pad]);
  if (vertical) {
    return {
      x: position,
      y: layerPosition,
    };
  }

  return {
    x: layerPosition,
    y: position,
  };
};

export default Layer;
