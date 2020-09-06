/* eslint-disable */
import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../../types/Coord';

interface Props {
  center: Coord;
  R: number;
  L1: number;
  L3: number;
  L4: number;
}

const OuterFigure: FunctionComponent<Props> = ({ center, R, L1, L3, L4 }) => {
  return (
    <>
      <Line
        x={center.x - L3 / 2}
        y={center.y + L1 / 2}
        points={[
          0, 0, 
          0, -L1, 
          -(L4 - L3) / 2, -L1,
          -(L4 - L3) / 2, -L1 - R,
          0, -L1 - R - R/2,
          L3, -L1 - R - R/2,
          L3 + (L4 - L3) / 2, -L1 - R,
          L3 + (L4 - L3) / 2, -L1,
          L3, -L1,
          L3, 0,
          L3 + (L4 - L3) / 2, 0,
          L3 + (L4 - L3) / 2, R,
          L3, R + R/2,
          0, R + R/2,
          -(L4 - L3) / 2, R,
          -(L4 - L3) / 2, 0,
        ]}
        closed
        stroke="black"
      />
    </>
  );
};

export default OuterFigure;
