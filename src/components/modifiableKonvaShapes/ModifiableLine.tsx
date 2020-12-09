import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import ILine from '../../types/Line';
import { ModifiableLinearShape } from '../../types/ModifiableShape';
import {
  applyModifiers,
  getMultiplePoints,
} from './modifiableKonvaShapes.service';

interface Props extends ModifiableLinearShape {
  points: ILine;
}

const ModifiableLine: FunctionComponent<Props> = ({
  points,
  modifiers,
  color,
  ...rest
}) => {
  const modifiedPoints = modifiers
    ? points.map((point) => applyModifiers(point, modifiers))
    : points;

  const startPoint = modifiedPoints[0];
  const endPoints = getMultiplePoints(startPoint, modifiedPoints.slice(1));

  return (
    <Line
      x={startPoint.x}
      y={startPoint.y}
      points={[0, 0, ...endPoints]}
      stroke={color || 'black'}
      {...rest}
    />
  );
};

export default ModifiableLine;
