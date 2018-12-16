import {
  IProps,
  ILayer,
  ILine,
  ICell,
} from './types';
import getLayer from './layer';
import getRange from './getRange';
import getPosition from './getPosition';
import {
  EXTRA_PADDING,
} from './config';

export type IChildren = {
  lines: any[];
  cells: any[];
}

type IGetCellsAndLines = (params: IProps) => IChildren;

const getCellsAndLines: IGetCellsAndLines = ({
  network: {
    layers,
    vertical,
  },
  width,
  height,
  ...props
}) => {
  const maxCells = layers.reduce((max, layer: ILayer) => {
    const units = parseInt(`${layer.units}`, 10);
    return max < units ? units : max;
  }, 0);

  const size = vertical ? height : width;
  let previousLayerCells: null | ICell[] = null;

  const start = (layers[0].diameter / 2) + layers[0].strokeWidth + EXTRA_PADDING;
  const lastLayer = layers[layers.length - 1];
  const end = size - ((lastLayer.diameter / 2) + lastLayer.strokeWidth) - EXTRA_PADDING;

  return layers.reduce((obj: IChildren, layer: ILayer, index: number) => {
    const layerPosition = getRange(
      getPosition(index, size, layers.length),
      [0, size],
      [start, end],
    );

    const {
      cells,
      // Component,
      lines,
    } = getLayer({
      index,
      layerPosition,
      maxCells,
      layerSize: vertical ? width : height,
      vertical,
      layer,
      previousLayerCells,
      ...props,
    });

    previousLayerCells = cells;

    return {
      lines: obj.lines.concat(lines),
      cells: obj.cells.concat(cells),
    };
  }, {
    lines: [],
    cells: [],
  });
};

export default getCellsAndLines;
