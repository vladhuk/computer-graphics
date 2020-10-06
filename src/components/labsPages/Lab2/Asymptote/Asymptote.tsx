import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { bindOffsetPoint } from '../../../../util/grapchicFunctions';
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

  const curveModifiers = [bindOffsetPoint(center), ...(modifiers || [])];

  return (
    <ModifiableLine
      from={{ x: -center.x, y: -getAnotherCoordParam(-center.x) }}
      to={[{ x: getAnotherCoordParam(-center.y), y: center.y }]}
      color={color}
      modifiers={curveModifiers}
      strokeWidth={1}
    />
  );
};

export default Asymptote;
