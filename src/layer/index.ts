import * as React from 'react';
import {
  COLORS,
} from '../config';
import getRange from '../getRange';

import {
  ILayer,
  ILine,
  // IPoint,
  ICell,
} from '../types';

import getLines from './getLines';
import getCells from './getCells';

interface IProps {
  index: number;
  layerPosition: number;
  maxCells: number;
  layerSize: number;
  vertical: boolean;
  layer: ILayer;
  previousLayerCells: ICell[];
}

type IGetLayer = (props: IProps) => {
  cells: ICell[];
  lines: ILine[];
};

const getLayer: IGetLayer = ({
  index: layer,
  layerPosition,
  maxCells,
  layerSize,
  vertical,
  layer: {
    units,
    diameter,
    strokeWidth,
  },
  previousLayerCells,
}) => {
  const cells = getCells({
    strokeWidth,
    units: parseInt(`${units}`, 10),
    layer,
    diameter,
    layerPosition,
    maxCells,
    layerSize,
    vertical,
  });

  const lines = getLines({
    layer,
    cells,
    previousLayerCells,
  });

  return {
    cells,
    lines,
  };
};

export default getLayer;
