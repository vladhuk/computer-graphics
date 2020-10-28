import React, { FunctionComponent } from 'react';
import { Circle } from 'react-konva';
import Coord from '../../types/Coord';
import { ModifiableShape } from '../../types/ModifiableShape';
import { applyModifiers } from './modifiableKonvaShapes.service';

interface Props extends ModifiableShape {
  position: Coord;
  radius: number;
}

const ModifiableCircle: FunctionComponent<Props> = ({
  position,
  modifiers,
  color,
  ...rest
}) => {
  const { x, y } = modifiers ? applyModifiers(position, modifiers) : position;

  return <Circle x={x} y={y} fill={color} {...rest} />;
};

export default ModifiableCircle;
