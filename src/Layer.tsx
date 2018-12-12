import * as React from 'react';
import {
  Circle,
  Line,
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
  // layer: ILayer;
  // vertical?: boolean;
  // layerPosition: number;
  // layerSize: number;
  // maxCells: number;
  fill: string;
  stroke: string;
  cells: {x: number; y: number}[];
}

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

const Layer:React.SFC<IProps> = ({
  cells,
  fill,
  stroke,
  strokeWidth,
  radius,
}) => cells.map((cell, key) => (
  <Cell
    key={key}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    radius={radius || 40}
    x={cell.x}
    y={cell.y}
  />
));

const getCells = (units, {
  maxCells,
  layerPosition,
  layerSize,
  vertical,
}) => {
  const points = [];

  for (let i = 0; i < units; i++) {
    points.push(getPosition({
      maxCells,
      i,
      layerPosition,
      layerSize,
      vertical,
      units,
    }));
  }

  return points;
};

const getLines = (cells, previousLayerCells, {
  lineColor,
  lineWidth,
}) => {
  const lines = [];

  if (!previousLayerCells) {
    return lines;
  }

  let key = 0;
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < previousLayerCells.length; j++) {
      const cell = cells[i];
      const previousCell = previousLayerCells[j];

      lines.push(<Line
        key={key++}
        points={[
          cell.x, cell.y,
          previousCell.x, previousCell.y,
        ]}
        stroke={lineColor || 'black'}
        strokeWidth={lineWidth === undefined ? 3 : Number(lineWidth)}
        closed
      />);
    }
  }

  return lines;
};

export default ({
  layerPosition,
  maxCells,
  layerSize,
  vertical,
  layer,
  previousLayerCells,
  lineColor,
  lineWidth,
}) => {
  const cells = getCells(layer.units, {
    layerPosition,
    maxCells,
    layerSize,
    vertical,
  });

  const lines = getLines(cells, previousLayerCells, {
    lineColor,
    lineWidth,
  });

  return {
    cells,
    lines,
    Component: () => (
      <Layer
        cells={cells}
        fill={layer.fill}
        stroke={layer.stroke}
        strokeWidth={layer.strokeWidth}
        radius={layer.radius}
      />
    ),
  };
};
