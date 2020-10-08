import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { ModifiableLine } from '../../../modifiableKonvaShapes';
import { bindGetAnotherCoordParam } from './Asymptote.service';

interface Props {
  maxCoord: Coord;
  a: number;
  color?: string;
  modifiers?: PointModifier[];
}

const Asymptote: FunctionComponent<Props> = ({
  maxCoord,
  a,
  color,
  modifiers,
}) => {
  const getAnotherCoordParam = bindGetAnotherCoordParam(a);

  return (
    <ModifiableLine
      from={{ x: -maxCoord.x, y: getAnotherCoordParam(-maxCoord.x) }}
      to={[{ x: getAnotherCoordParam(-maxCoord.y), y: -maxCoord.y }]}
      color={color}
      modifiers={modifiers}
      strokeWidth={1}
    />
  );
};

export default Asymptote;
