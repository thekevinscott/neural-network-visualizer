import * as React from 'react';
import {
  Circle,
} from 'react-konva';
import * as Konva from 'konva';
import {
  COLORS,
} from './config';

interface IProps {
  x: number;
  y: number;
  radius?: number;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
}

const DEFAULT_RADIUS = 50;
const DEFAULT_STROKE_WIDTH = 3;
const DEFAULT_FILL = COLORS[0].toString();
const DEFAULT_STROKE = 'black';

const Cell:React.SFC<IProps> = ({
  x,
  y,
  strokeWidth,
  radius,
  fill,
  stroke,
}) => {
  const strkWidth = strokeWidth || DEFAULT_STROKE_WIDTH;
  const rad = (radius || DEFAULT_RADIUS) - strkWidth;
  return (
    <Circle
      x={x}
      y={y}
      radius={rad}
      fill={fill || DEFAULT_FILL}
      strokeWidth={strkWidth}
      stroke={stroke || DEFAULT_STROKE}
    />
  );
};

export default Cell;
