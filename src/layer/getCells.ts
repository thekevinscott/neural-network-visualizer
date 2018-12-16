import {
  COLORS,
  EXTRA_PADDING,
} from '../config';
import getPosition from '../getPosition';
import getRange from '../getRange';
import {
  ICell,
  IPoint,
} from '../types';

interface IParams {
  strokeWidth: number;
  units: number;
  layer: number;
  diameter: number;
  maxCells: number;
  layerPosition: number;
  layerSize: number;
  vertical: boolean;
}

type IGetCells = (params: IParams) => ICell[];

type IGetCellPosition = (params: IProps) => IPoint;

interface IProps extends IParams {
  i: number;
}

const getCellPosition: IGetCellPosition = ({
  i,

  strokeWidth,
  diameter,
  maxCells,
  vertical,
  layerPosition,
  layerSize,
  units,
}) => {
  const extraAmount = 1200 / (maxCells ** 2);
  const extraPadding = extraAmount * (maxCells - units);
  const pad = (diameter * .5 + strokeWidth + EXTRA_PADDING) + extraPadding;
  const position = getRange(getPosition(i, layerSize, units), [0, layerSize], [pad, layerSize - pad]);
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

const getCells: IGetCells = ({
  units,
  layer,
  ...props
  // diameter,
  // maxCells,
  // layerPosition,
  // layerSize,
  // vertical,
  // strokeWidth,
}) => {
  const points = [];

  for (let i = 0; i < units; i++) {
    const position = getCellPosition({
      i,
      units,
      layer,
      ...props,
    });

    points.push({
      layer,
      ...position,
    });
  }

  return points;
};


export default getCells;
