import React, { FunctionComponent } from 'react';
import Coord from '../../../../../types/Coord';
import PointModifier from '../../../../../types/PointModifier';
import ModifiableLine from '../../../../modifiableKonvaShapes/ModifiableLine';

interface Props {
  R: number;
  L1: number;
  L2: number;
  modifiers?: PointModifier[];
}

const InnerShape: FunctionComponent<Props> = ({ R, L1, L2, modifiers }) => {
  const circleCenter: Coord = { x: 0, y: -L1 / 2 };
  const circleLineLength = 1;

  const getCircleY = (x: number, scale: number): number => {
    return (
      Math.sqrt(Math.abs(R ** 2 - (x - circleCenter.x) ** 2)) * scale +
      circleCenter.y
    );
  };

  const getCircleLine = (x: number, scale: number) => (
    <ModifiableLine
      points={[
        { x, y: getCircleY(x, scale) },
        {
          x: x + circleLineLength,
          y: getCircleY(x + circleLineLength, scale),
        },
      ]}
      modifiers={modifiers}
    />
  );

  const circleLines = [];

  for (let x = -R; x < R; x += circleLineLength) {
    if (x > L2 / 2 || x < -L2 / 2) {
      circleLines.push(getCircleLine(x, 1));
    }
    circleLines.push(getCircleLine(x, -1));
  }

  const xStart = -L2 / 2;
  const yStart = getCircleY(xStart, 1);
  const L1ExcludeCircle = L1 / 2 + yStart;

  return (
    <>
      <ModifiableLine
        points={[
          { x: xStart, y: yStart },
          { x: xStart, y: yStart + L1 - L1ExcludeCircle + R / 2 },
          { x: xStart + L2, y: yStart + L1 - L1ExcludeCircle + R / 2 },
          { x: xStart + L2, y: yStart },
        ]}
        modifiers={modifiers}
      />
      {circleLines}
    </>
  );
};

export default InnerShape;
