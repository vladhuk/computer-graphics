import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';

interface Props {
  center: Coord;
  R: number;
  L1: number;
  L2: number;
  L3: number;
  L4: number;
}

const Figure: FunctionComponent<Props> = ({ center, L1, L2, L3, L4 }) => {
  return <></>;
};

export default Figure;
