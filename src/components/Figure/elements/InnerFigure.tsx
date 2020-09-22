import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import { bindRotatePoint } from '../../../util/grapchicFunctions';
import CoordLine from '../../CoordLine';

interface Props {
  center: Coord;
  R: number;
  L1: number;
  L2: number;
  pivot: Coord;
  rotate: number;
}

const InnerFigure: FunctionComponent<Props> = ({
  center,
  R,
  L1,
  L2,
  pivot,
  rotate,
}) => {
  const rotatePoint = bindRotatePoint(rotate, pivot);

  const circleCenter: Coord = { x: center.x, y: center.y + L1 / 2 };
  const circleLineLength = 1;

  const getCircleY = (x: number, scale: number): number => {
    return (
      Math.sqrt(Math.abs(R ** 2 - (x - circleCenter.x) ** 2)) * scale +
      circleCenter.y
    );
  };

  const getCircleLine = (x: number, scale: number) => (
    <CoordLine
      from={rotatePoint({ x, y: getCircleY(x, scale) })}
      to={[
        {
          x: x + circleLineLength,
          y: getCircleY(x + circleLineLength, scale),
        },
      ].map(rotatePoint)}
    />
  );

  const circleLines = [];

  for (let x = center.x - R; x < center.x + R; x += circleLineLength) {
    if (x > center.x + L2 / 2 || x < center.x - L2 / 2) {
      circleLines.push(getCircleLine(x, -1));
    }
    circleLines.push(getCircleLine(x, 1));
  }

  const xStart = center.x - L2 / 2;
  const yStart = getCircleY(xStart, -1);
  const L1ExcludeCircle = center.y + L1 / 2 - yStart;

  return (
    <>
      <CoordLine
        from={rotatePoint({ x: xStart, y: yStart })}
        to={[
          { x: xStart, y: yStart - L1 + L1ExcludeCircle - R / 2 },
          { x: xStart + L2, y: yStart - L1 + L1ExcludeCircle - R / 2 },
          { x: xStart + L2, y: yStart },
        ].map(rotatePoint)}
      />
      {circleLines}
    </>
  );
};

export default InnerFigure;
