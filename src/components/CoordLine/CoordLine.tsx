import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import { applyModifiers, getPoints } from './CoordLine.service';

interface Props {
  from: Coord;
  to: Coord[];
  modifiers?: PointModifier[];
  closed?: boolean;
}

const CoordLine: FunctionComponent<Props> = ({
  from,
  to,
  modifiers,
  closed,
}) => {
  const startPoint = modifiers ? applyModifiers(from, modifiers) : from;

  const modifiedEndPoints = modifiers
    ? to.map((point) => applyModifiers(point, modifiers))
    : to;
  const points = getPoints(startPoint, modifiedEndPoints);

  return (
    <Line
      x={startPoint.x}
      y={startPoint.y}
      points={[0, 0, ...points]}
      closed={closed}
      stroke="black"
    />
  );
};

export default CoordLine;
