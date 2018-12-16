import {
  IProps,
  ILayer,
} from './types';
import rough from 'roughjs';
import getPosition from './getPosition';
import getRange from './getRange';
import getCellsAndLines from './getCellsAndLines';
import {
  COLORS,
  DEFAULT_DIAMETER,
  DEFAULT_FILL,
  DEFAULT_FILL_WEIGHT,
  DEFAULT_FILL_STYLE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_LINE_WIDTH,
  DEFAULT_ROUGHNESS,
  DEFAULT_BOWING,
} from './config';

const parseProps = ({
  network,
  ...props
}: IProps) => ({
  ...props,
  network: {
    ...network,
    layers: network.layers.map(layer => ({
      ...layer,
      diameter: layer.diameter || network.diameter || DEFAULT_DIAMETER,
      fill: layer.fill || network.fill || DEFAULT_FILL,
      fillWeight: layer.fillWeight || network.fillWeight || DEFAULT_FILL_WEIGHT,
      fillStyle: layer.fillStyle || network.fillStyle || DEFAULT_FILL_STYLE,
      strokeWidth: layer.strokeWidth || network.strokeWidth || DEFAULT_STROKE_WIDTH,
      lineWidth: layer.lineWidth || network.lineWidth || DEFAULT_LINE_WIDTH,
      roughness: layer.roughness || network.roughness || DEFAULT_ROUGHNESS,
      bowing: layer.bowing || network.bowing || DEFAULT_BOWING,
    })),
  },
});

class NNVisualizer {
  private canvas: HTMLCanvasElement;

  constructor(target: HTMLElement, props:IProps) {
    const {
      width,
      height,
    } = props;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    target.appendChild(this.canvas);

    const parsedProps = parseProps(props);

    const {
      lines,
      cells,
    } = getCellsAndLines(parsedProps);

    const rc = rough.canvas(this.canvas);

    lines.forEach(line => {
      const layer = parsedProps.network.layers[line.layer];
      console.log(layer);
      rc.line(
        line.points[0].x,
        line.points[0].y,
        line.points[1].x,
        line.points[1].y,
        {
          ...layer,
          strokeWidth: layer.lineWidth,
        }
      );
    });

    cells.forEach(cell => {
      const layer = parsedProps.network.layers[cell.layer];
      rc.circle(
        cell.x,
        cell.y,
        layer.diameter,
        {
          ...layer,
        }
      );
    });
  }
}

export default NNVisualizer;
