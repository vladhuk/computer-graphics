import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { ModifiableLine } from '../../../modifiableKonvaShapes';
import { bindGetAnotherCoordParam } from './Asymptote.service';

interface Props {
  center: Coord;
  a: number;
  color?: string;
  modifiers?: PointModifier[];
}

const Asymptote: FunctionComponent<Props> = ({
  center,
  a,
  color,
  modifiers,
}) => {
  const getAnotherCoordParam = bindGetAnotherCoordParam(a);

  return (
    <ModifiableLine
      from={{ x: -center.x, y: getAnotherCoordParam(-center.x) }}
      to={[{ x: getAnotherCoordParam(-center.y), y: -center.y }]}
      color={color}
      modifiers={modifiers}
      strokeWidth={1}
    />
  );
};

export default Asymptote;
