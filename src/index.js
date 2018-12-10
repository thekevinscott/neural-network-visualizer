import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';
import {
  Stage,
  Layer,
  Circle,
  Line,
  // Shape,
} from 'react-konva';
import Konva from 'konva';
import resize from 'utils/resize';
import model from './model';

const getXY = ({
  layerIndex,
  layers,
  yEnd,

  layerCells,
  cellIndex,
  numberOfTotalCells,
}) => {
  const distance = 1 / (numberOfTotalCells - 1);
  return {
    x: layerIndex / (layers.length - 1),
    y: (distance / 2 * (numberOfTotalCells - layerCells)) + cellIndex * distance,
  };
};

const getPointFn = ({
  vertical,
  xStart,
  yStart,
  xEnd,
  yEnd,
  layers,
}) => ({
  cell,
  maxNumberOfCells,
  layerIndex,
  layerCells,
}) => {
  const {
    x,
    y,
  } = getXY({
    layerIndex,
    layers,
    yEnd,

    cellIndex: cell,
    numberOfTotalCells: maxNumberOfCells,
    layerCells,
  });

  if (vertical) {
    return {
      x: xStart + (y * xEnd),
      y: yStart + (x * yEnd),
    };
  }

  return {
    x: xStart + (x * xEnd),
    y: yStart + (y * yEnd),
  };
};

const rand = (max, min=0) => min + Math.floor(Math.random() * (max-min));

const OFFSET = 2;
const Cell = ({
  x,
  y,
  radius,
  color,
}) => ({
  Offset: <Circle
    key={`offset-${x}${y}`}
    x={x}
    y={y+OFFSET}
    radius={radius}
    fill={`hsl(${rand(360)},${rand(100, 80)}%,${rand(20, 10)}%)`}
  />,
  Cell: <Circle
    key={`circle-${x}${y}`}
    x={x}
    y={y}
    radius={radius}
    fill={color}
  />
});

const getColors = total => {
  const offset = rand(360);
  return [...Array(total).keys()].map(index => index / total * 360).map(hue => `hsl(${hue + offset},${rand(90, 50)}%,${rand(70, 40)}%)`).sort(() => (Math.random() * 2) - 1);
};

const CellLine = ({
  x,
  y,
  previousLayerCell,
  radius,
  stretchy,
  color,
}) => {
  let angle = 180 - Math.atan2(y - previousLayerCell.y, x - previousLayerCell.x) * 180 / Math.PI;
  if (stretchy) {
    const halfway = [
      x + (previousLayerCell.x - x) / 2,
      y + (previousLayerCell.y - y) / 2,
    ];
    angle = 180 - angle;
    const pull = 0.55;
    const offRadius = 0.99;
    return (
      <Line
        points={[
          previousLayerCell.x - (Math.sin(angle / 180 * Math.PI)*radius*offRadius),
          previousLayerCell.y - (Math.cos(angle / 180 * Math.PI)*radius*offRadius),
          previousLayerCell.x - (Math.sin(angle / 180 * Math.PI)*radius*offRadius),
          previousLayerCell.y - (Math.cos(angle / 180 * Math.PI)*radius*offRadius),

          // the pull
          halfway[0] + (Math.sin(angle / 180 * Math.PI)*radius*pull),
          halfway[1] + (Math.cos(angle / 180 * Math.PI)*radius*pull),

          x - (Math.sin(angle / 180 * Math.PI) * radius*offRadius),
          y - (Math.cos(angle / 180 * Math.PI) * radius*offRadius),

          x + (Math.sin(angle / 180 * Math.PI) * radius*offRadius),
          y + (Math.cos(angle / 180 * Math.PI) * radius*offRadius),
          x + (Math.sin(angle / 180 * Math.PI) * radius*offRadius),
          y + (Math.cos(angle / 180 * Math.PI) * radius*offRadius),
          x + (Math.sin(angle / 180 * Math.PI) * radius*offRadius),
          y + (Math.cos(angle / 180 * Math.PI) * radius*offRadius),

          halfway[0] - (Math.sin(angle / 180 * Math.PI)*radius*pull),
          halfway[1] - (Math.cos(angle / 180 * Math.PI)*radius*pull),

          previousLayerCell.x + (Math.sin(angle / 180 * Math.PI)*radius*offRadius),
          previousLayerCell.y + (Math.cos(angle / 180 * Math.PI)*radius*offRadius),
          previousLayerCell.x + (Math.sin(angle / 180 * Math.PI)*radius*offRadius),
          previousLayerCell.y + (Math.cos(angle / 180 * Math.PI)*radius*offRadius),
        ]}
        bezier
        closed
        fill={"rgba(0,0,0,0.4)"}
        strokeWidth={0}
      />
    );
  }

  const offRadius = 0.15;
  const points = [
    previousLayerCell.x - (Math.sin(angle / 180 * Math.PI)*radius*offRadius),
    previousLayerCell.y - (Math.cos(angle / 180 * Math.PI)*radius*offRadius),
    x - (Math.sin(angle / 180 * Math.PI) * radius*offRadius),
    y - (Math.cos(angle / 180 * Math.PI) * radius*offRadius),
    x + (Math.sin(angle / 180 * Math.PI) * radius*offRadius),
    y + (Math.cos(angle / 180 * Math.PI) * radius*offRadius),
    previousLayerCell.x + (Math.sin(angle / 180 * Math.PI)*radius*offRadius),
    previousLayerCell.y + (Math.cos(angle / 180 * Math.PI)*radius*offRadius),
  ];
  // angle = 180 - angle;
  return (
    <React.Fragment>
      <Line
        points={points.map((point, index) => index % 2 ? point + 2 : point)}
        closed
        fill={`hsl(${rand(360)},${rand(100, 80)}%,${rand(20, 10)}%)`}
      />
      <Line
        points={points}
        closed
        fillLinearGradientStartPoint={previousLayerCell}
        fillLinearGradientEndPoint={{ x, y }}
        fillLinearGradientColorStops={[1, color, 0, previousLayerCell.color]}
        strokeWidth={0}
      />
    </React.Fragment>
  );
};

const Body = ({
  width,
  height,
  layers,
  padding,
  radius,
  vertical,
}) => {
  const maxNumberOfCells = layers.reduce((max, { cells }) => cells > max ? cells : max, 0);
  const totalNumberOfCells = layers.reduce((total, { cells }) => total + cells, 0);
  const colors = getColors(totalNumberOfCells);
  const points = layers.reduce((obj, layer, layerIndex) => {
    const xStart = radius + padding;
    const yStart = radius + padding;
    const xEnd = width - (radius * 2) - (padding * 2);
    const yEnd = height - (radius * 3) - (padding * 2);
    const getPoint = getPointFn({
      vertical,
      xStart,
      yStart,
      xEnd,
      yEnd,
      layers,
    });

    return {
      ...obj,
      [layerIndex]: [...Array(layer.cells).keys()].reduce((cells, cell) => {
        const {
          x,
          y,
        } = getPoint({
          cell,

          layerCells: layer.cells,
          maxNumberOfCells,
          layerIndex,
        });

        return {
          ...cells,
          [cell]: {
            x,
            y,
            color: colors.pop(),
          },
        };
      }, {}),
    };
  }, {});

  let Cells = [];
  let Offsets = [];

  return (
    <Stage
      width={width}
      height={height}
    >
      <Layer>
        {Offsets}
      </Layer>
      {layers.map((layer, layerIndex) => {
        return (
          <Layer
            key={layerIndex}
            fill={Konva.Util.getRandomColor()}
          >
            {[...Array(layer.cells).keys()].map(cell => {
              const {
                x,
                y,
                color,
              } = points[layerIndex][cell];

              const {
                Cell: Cll,
                Offset,
              } = Cell({
                x,
                y,
                radius,
                color,
              });

              Cells.push(Cll);
              Offsets.push(Offset);
              if (layerIndex > 0) {
                return Object.entries(points[layerIndex - 1]).sort((a, b) => {
                  return a[0] - b[0];
                }).map(([_, cell]) => cell).reverse().map((previousLayerCell, key) => (
                  <React.Fragment
                    key={`cell-line-${layerIndex}-${cell}-${key}`}
                  >
                    <CellLine
                      x={x}
                      y={y}
                      previousLayerCell={previousLayerCell}
                      radius={radius}
                      color={color}
                    />
                  </React.Fragment>
                ));
              }

              return null;
            })}
          </Layer>
        );
      })}
      <Layer>
        {Cells}
      </Layer>
    </Stage>
  );
};

class NeuralNet extends Component {
  constructor(props) {
    super(props);

    this.state = { ref: null, preds: null, };
  }

  getRef = ref => {
    if (!this.state.ref) {
      this.setState({
        ref,
      });
    }
  }

  componentDidMount () {
    // this.createModel();
  }

  createModel = async() => {
    const { preds, size } = await model(this.props.data);
    this.setState({
      preds,
      size,
    });
  }

  // shouldComponentUpdate() {
  //   // return false;
  // }

  render() {
    const {
      className,
      layers,
      vertical,
    } = this.props;

    const padding = 30;
    const radius = 25;

    return (
      <div
        className={classNames(styles.nn, className)}
        ref={this.getRef}
      >
        <div className="plots">
          <div id="data">
            <div className="caption">Original Data (Synthetic)</div>
            <div className="caption">True coefficients: <span className='coeff'></span></div>
            <div className="plot"></div>
          </div>
          <div id="trained">
            <div className="caption">Fit curve with learned coefficients (after training)</div>
            <div className="caption">Learned coefficients:
              <span className='coeff'></span>
            </div>
            <div className="plot"></div>
          </div>
        </div>
        {this.state.ref && (
          <Body
            vertical={vertical}
            width={this.state.ref.offsetWidth}
            height={this.state.ref.offsetHeight * .8}
            layers={layers}
            padding={padding}
            radius={radius}
          />
        )}
      </div>
    );
  }
}

NeuralNet.propTypes = {
  className: PropTypes.string.isRequired,
  vertical: PropTypes.bool,
};

NeuralNet.defaultProps = {
  className: '',
  vertical: false,
};

export default resize()(NeuralNet);
