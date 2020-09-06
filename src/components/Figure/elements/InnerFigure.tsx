/* eslint-disable */
import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../../types/Coord';

interface Props {
  center: Coord;
  R: number;
  L1: number;
  L2: number;
}

const InnerFigure: FunctionComponent<Props> = ({ center, R, L1, L2 }) => {
  const circleCenter: Coord = { x: center.x, y: center.y + L1 / 2 };
  const circleLineLength = 1;

  const getY = (x: number, scale: number): number => {
    return (
      Math.sqrt(Math.abs(R ** 2 - (x - circleCenter.x) ** 2)) * scale +
      circleCenter.y
    );
  };

  const getLine = (x: number, scale: number) => {
    const y = getY(x, scale);
    return (
      <Line
        x={x}
        y={y}
        points={[0, 0, circleLineLength, getY(x + circleLineLength, scale) - y]}
        stroke="black"
      />
    );
  };

  const circleLines = [];

  for (let x = center.x - R; x < center.x + R; x += circleLineLength) {
    if (x > center.x + L2 / 2 || x < center.x - L2 / 2) {
      circleLines.push(getLine(x, -1));
    }
    circleLines.push(getLine(x, 1));
  }

  const xStart = center.x - L2 / 2;
  const yStart = getY(xStart, -1);
  const L1ExcludeCircle = center.y + L1 / 2 - yStart;

  return (
    <>
      <Line
        x={xStart}
        y={yStart}
        points={[
          0, 0, 
          0, -L1 + L1ExcludeCircle - R / 2,
          L2, -L1 + L1ExcludeCircle - R / 2,
          L2, 0,
        ]}
        stroke="black"
      />
      {circleLines}
    </>
  );
};

export default InnerFigure;
