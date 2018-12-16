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

const nn = new NNVisualizer(root, {
  width: 800,
  height: 600,
  network: {
    vertical: false,
    roughness: 5.5,
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

// nn.animate({
//   animateInterval: 100,
//   roughness: [1, 1.2],
// });
