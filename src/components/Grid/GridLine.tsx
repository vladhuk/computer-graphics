import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';

interface Props {
  start: Coord;
  end: Coord;
}

const GridLine: FunctionComponent<Props> = ({ start, end }) => (
  <Line
    x={start.x}
    y={start.y}
    points={[0, 0, end.x, end.y]}
    stroke="black"
    strokeWidth={0.3}
  />
);

export default GridLine;
