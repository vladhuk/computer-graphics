import React, { FunctionComponent } from 'react';
import { Arrow } from 'react-konva';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import { applyModifiers, getPoints } from './modifiableKonvaShapes.service';

interface Props {
  from: Coord;
  to: Coord;
  modifiers?: PointModifier[];
  strokeWidth?: number;
  pointerLength?: number;
  pointerWidth?: number;
  fill?: string;
}

const ModifiableArrow: FunctionComponent<Props> = ({
  from,
  to,
  modifiers,
  ...rest
}) => {
  const points = modifiers
    ? [from, to].map((point) => applyModifiers(point, modifiers))
    : [from, to];

  return (
    <Arrow
      x={points[0].x}
      y={points[0].y}
      points={[0, 0, ...getPoints(points[0], points[1])]}
      stroke="black"
      {...rest}
    />
  );
};

export default ModifiableArrow;
