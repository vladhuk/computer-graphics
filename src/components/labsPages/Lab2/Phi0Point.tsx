import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import ModifiableCircle from '../../modifiableKonvaShapes/ModifiableCircle';

interface Props {
  position: Coord;
  modifiers?: PointModifier[];
  color?: string;
}

const Phi0Point: FunctionComponent<Props> = ({
  position,
  modifiers,
  color,
}) => (
  <ModifiableCircle
    position={position}
    radius={5}
    modifiers={modifiers}
    fill={color}
  />
);

export default Phi0Point;
