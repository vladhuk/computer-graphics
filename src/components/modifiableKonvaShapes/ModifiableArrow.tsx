import React, { FunctionComponent } from 'react';
import { Arrow } from 'react-konva';
import Coord from '../../types/Coord';
import { ModifiableLinearShape } from '../../types/ModifiableShape';
import { applyModifiers, getPoints } from './modifiableKonvaShapes.service';

interface Props extends ModifiableLinearShape {
  from: Coord;
  to: Coord;
  pointerLength?: number;
  pointerWidth?: number;
}

const ModifiableArrow: FunctionComponent<Props> = ({
  from,
  to,
  modifiers,
  color,
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
      stroke={color}
      fill={color}
      {...rest}
    />
  );
};

export default ModifiableArrow;
