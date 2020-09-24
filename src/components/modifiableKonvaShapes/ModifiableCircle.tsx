import React, { FunctionComponent } from 'react';
import { Circle } from 'react-konva';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import { applyModifiers } from './modifiableKonvaShapes.service';

interface Props {
  position: Coord;
  radius: number;
  modifiers?: PointModifier[];
  fill?: string;
}

const ModifiableCircle: FunctionComponent<Props> = ({
  position,
  modifiers,
  ...rest
}) => {
  const { x, y } = modifiers ? applyModifiers(position, modifiers) : position;

  return <Circle x={x} y={y} {...rest} />;
};

export default ModifiableCircle;
