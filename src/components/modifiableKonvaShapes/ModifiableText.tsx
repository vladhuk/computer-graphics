import React, { FunctionComponent } from 'react';
import { Text } from 'react-konva';
import Coord from '../../types/Coord';
import { ModifiableShape } from '../../types/ModifiableShape';
import { applyModifiers } from './modifiableKonvaShapes.service';

interface Props extends ModifiableShape {
  position: Coord;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
}

const ModifiableText: FunctionComponent<Props> = ({
  position,
  modifiers,
  color,
  ...rest
}) => {
  const { x, y } = modifiers ? applyModifiers(position, modifiers) : position;

  return <Text x={x} y={y} fill={color} {...rest} />;
};

export default ModifiableText;
