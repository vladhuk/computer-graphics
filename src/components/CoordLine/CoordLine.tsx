import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';

interface Props {
  from: Coord;
  to: Coord[];
  closed?: boolean;
}

const CoordLine: FunctionComponent<Props> = ({ from, to, closed }) => {
  const points = to.flatMap((value) => [value.x - from.x, value.y - from.y]);

  return (
    <Line
      x={from.x}
      y={from.y}
      points={[0, 0, ...points]}
      closed={closed}
      stroke="black"
    />
  );
};

export default CoordLine;
