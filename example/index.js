import NNVisualizer from '../dist';
const Color = require('color');

export const COLORS = [
  Color.hsl([199, 100, 57]),
  Color.hsl([33, 100, 50]),
];

const root = document.getElementById('root');
while (root.firstChild) {
  root.removeChild(root.firstChild);
}

new NNVisualizer(root, {
  width: 800,
  height: 600,
  // lineColor: 'rgba(0,0,0,0.7)',
  network: {
    vertical: false,
    // fillStyle: 'zigzag',
    roughness: 2,
    layers: [
      {
        units: "1",
        fill: COLORS[0],
        stroke: 'black',
      },
      {
        units: 4,
        fill: COLORS[1],
        stroke: 'black',
      },
      {
        units: 2,
        fill: COLORS[0],
        stroke: 'black',
      },
    ],
  },
});
