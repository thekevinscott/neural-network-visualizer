import {
  ILine,
  IPoint,
} from '../types';

type IGetLines = (params: {
  layer: number;
  cells: IPoint[];
  previousLayerCells: IPoint[];
}) => ILine[];

const getLines: IGetLines = ({
  layer,
  cells,
  previousLayerCells,
}) => {
  const lines: ILine[] = [];

  if (!previousLayerCells) {
    return lines;
  }

  let key = 0;
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < previousLayerCells.length; j++) {
      const cell = cells[i];
      const previousCell = previousLayerCells[j];
      const points: [IPoint, IPoint] = [
        cell,
        previousCell,
      ];

      const line = {
        layer,
        points,
      };

      lines.push(line);
    }
  }

  return lines;
};

export default getLines;
