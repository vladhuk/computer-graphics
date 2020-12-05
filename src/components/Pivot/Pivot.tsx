import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import ModifiableCircle from '../modifiableKonvaShapes/ModifiableCircle';
import ModifiableDndOptions from '../modifiableKonvaShapes/ModifiableDndOptions';

interface Props {
  position: Coord;
  modifiers?: PointModifier[];
  dndOptions?: ModifiableDndOptions;
}

const Pivot: FunctionComponent<Props> = ({
  position,
  modifiers,
  dndOptions,
}) => {
  return (
    <ModifiableCircle
      position={position}
      modifiers={modifiers}
      radius={5}
      color="red"
      dndOptions={dndOptions}
    />
  );
};

export default Pivot;
