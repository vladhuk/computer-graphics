import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';
import { ModifiableLinearShape } from '../../types/ModifiableShape';
import {
  applyModifiers,
  getMultiplePoints,
} from './modifiableKonvaShapes.service';

export interface Line {
  from: Coord;
  to: Coord[];
}

type Props = Line & ModifiableLinearShape;

const ModifiableLine: FunctionComponent<Props> = ({
  from,
  to,
  modifiers,
  color,
  ...rest
}) => {
  const startPoint = modifiers ? applyModifiers(from, modifiers) : from;

  const modifiedEndPoints = modifiers
    ? to.map((point) => applyModifiers(point, modifiers))
    : to;
  const points = getMultiplePoints(startPoint, modifiedEndPoints);

  return (
    <Line
      x={startPoint.x}
      y={startPoint.y}
      points={[0, 0, ...points]}
      stroke={color || 'black'}
      {...rest}
    />
  );
};

export default ModifiableLine;
