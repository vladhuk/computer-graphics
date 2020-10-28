import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';
import { ModifiableLinearShape } from '../../types/ModifiableShape';
import PointModifier from '../../types/PointModifier';
import {
  applyModifiers,
  getMultiplePoints,
} from './modifiableKonvaShapes.service';

export interface Bezier {
  point: Coord;
  b: Coord[];
}

interface Props extends ModifiableLinearShape {
  from: Coord;
  to: Bezier[];
}

const ModifiableBezier: FunctionComponent<Props> = ({
  from,
  to,
  modifiers,
  color,
  ...rest
}) => {
  const startPoint = modifiers ? applyModifiers(from, modifiers) : from;

  // const modifiedEndPoints = modifiers
  //   ? to.map((point) => applyModifiers(point, modifiers))
  //   : to;
  // const points = getMultiplePoints(startPoint, modifiedEndPoints);

  return (
    <Line
      x={startPoint.x}
      y={startPoint.y}
      points={[0, 0, []]}
      stroke={color || 'black'}
      {...rest}
      bezier
    />
  );
};

export default ModifiableBezier;
