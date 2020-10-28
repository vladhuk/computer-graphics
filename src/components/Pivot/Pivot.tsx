import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import ModifiableCircle from '../modifiableKonvaShapes/ModifiableCircle';

interface Props {
  position: Coord;
  modifiers?: PointModifier[];
}

const Pivot: FunctionComponent<Props> = ({ position, modifiers }) => (
  <ModifiableCircle
    position={position}
    modifiers={modifiers}
    radius={5}
    color="red"
  />
);

export default Pivot;
