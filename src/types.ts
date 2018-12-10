export interface INetwork {
  vertical?: boolean;
  layers: ILayer[];
}

export interface ILayer {
  units: number;
}
