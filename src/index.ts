import {
  INetwork,
  IProps,
  ILayer,
  ILine,
  ICell,
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
  private network: INetwork;
  private cells: ICell[];
  private lines: ILine[];
  private animating: boolean = false;

  constructor(target: HTMLElement, props:IProps) {
    const {
      width,
      height,
    } = props;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    const deviceScaleFactor = props.deviceScaleFactor || 1;
    this.canvas.style.width = `${width / 2}px`;
    this.canvas.style.height = `${height / 2}px`;
    this.canvas.getContext('2d').scale(2, 1);
    target.appendChild(this.canvas);

    const parsedProps = parseProps(props);

    this.network = parsedProps.network;

    const {
      lines,
      cells,
    } = getCellsAndLines(parsedProps);

    this.lines = lines;
    this.cells = cells;

    this.render();
  }

  render = (roughness?: number) => {
    const rc = rough.canvas(this.canvas);

    this.lines.forEach(line => {
      const layer = this.network.layers[line.layer];
      rc.line(
        line.points[0].x,
        line.points[0].y,
        line.points[1].x,
        line.points[1].y,
        {
          ...layer,
          roughness: roughness || layer.roughness,
          strokeWidth: layer.lineWidth,
        }
      );
    });

    this.cells.forEach(cell => {
      const layer = this.network.layers[cell.layer];
      rc.circle(
        cell.x,
        cell.y,
        layer.diameter,
        {
          ...layer,
          roughness: roughness || layer.roughness,
        }
      );
    });
  }

  animate = ({
    animateInterval,
    roughness,
  }: {
    animateInterval?: number;
    roughness?: [number, number];
  } = {}) => {
    this.animating = true;
    const render = () => {
      this.render(getRand(roughness));
      setInterval(() => {
        render();
      }, animateInterval || 100);
    };

    render();
  }

  stopAnimating = () => {
    this.animating = false;
  }
}

const getRand = (range: [number, number]) => range[0] + (Math.random() * (range[1] - range[0]));

export default NNVisualizer;
