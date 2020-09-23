import React, { FunctionComponent } from 'react';
import { Text } from 'react-konva';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import { applyModifiers } from './modifiableKonvaShapes.service';

interface Props {
  position: Coord;
  modifiers?: PointModifier[];
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fill?: string;
}

const ModifiableText: FunctionComponent<Props> = ({
  position,
  modifiers,
  ...rest
}) => {
  const { x, y } = modifiers ? applyModifiers(position, modifiers) : position;

  return <Text x={x} y={y} {...rest} />;
};

export default ModifiableText;
