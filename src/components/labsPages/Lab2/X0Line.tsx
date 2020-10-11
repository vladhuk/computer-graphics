import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import { ModifiableLine } from '../../modifiableKonvaShapes';

interface Props {
  maxCoord: Coord;
  f(x: number): number;
  invert?: boolean;
  color?: string;
  modifiers?: PointModifier[];
}

const X0Line: FunctionComponent<Props> = ({
  maxCoord,
  f,
  invert,
  color,
  modifiers,
}) => {
  const scale = invert ? -1 : 1;

  return (
    <ModifiableLine
      from={{
        x: -maxCoord.x,
        y: f(-maxCoord.x) * scale,
      }}
      to={[
        {
          x: maxCoord.x,
          y: f(maxCoord.x) * scale,
        },
      ]}
      color={color}
      modifiers={modifiers}
    />
  );
};

export default X0Line;
