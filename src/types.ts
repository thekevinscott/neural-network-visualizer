export interface INetwork {
  vertical?: boolean;
  layers: ILayer[];
  diameter?: number;
  fill?: string;
  fillWeight?: number;
  fillStyle?: string;
  strokeWidth?: number;
  lineWidth?: number;
  roughness?: number;
  bowing?: number;
}

export interface ILayer {
  units: number;
  diameter?: number;
  fill?: string;
  fillWeight?: number;
  fillStyle?: string;
  strokeWidth?: number;
  lineWidth?: number;
  roughness?: number;
  bowing?: number;
}

export interface IProps {
  width: number;
  height: number;
  deviceScaleFactor?: number;
  network: INetwork;
  lineColor?: string;
}

export type IPoint = {
  x: number;
  y: number;
};

export type ICell = {
  x: number;
  y: number;
  layer: number;
}

export type ILine = {
  points?: [IPoint, IPoint];
  // stroke?: string;
  // strokeWidth?: number;
  layer: number;
}
