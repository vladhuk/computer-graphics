import React, { FunctionComponent } from 'react';
import Coord from '../../../../../types/Coord';
import PointModifier from '../../../../../types/PointModifier';
import { ModifiableLine } from '../../../../modifiableKonvaShapes';

interface Props {
  R: number;
  L1: number;
  L3: number;
  L4: number;
  modifiers?: PointModifier[];
}

const OuterShape: FunctionComponent<Props> = ({ R, L1, L3, L4, modifiers }) => {
  const start: Coord = {
    x: -L3 / 2,
    y: -L1 / 2,
  };

  return (
    <ModifiableLine
      from={start}
      to={[
        { x: start.x, y: start.y + L1 },
        { x: start.x - (L4 - L3) / 2, y: start.y + L1 },
        { x: start.x - (L4 - L3) / 2, y: start.y + L1 + R },
        { x: start.x, y: start.y + L1 + R + R / 2 },
        { x: start.x + L3, y: start.y + L1 + R + R / 2 },
        { x: start.x + L3 + (L4 - L3) / 2, y: start.y + L1 + R },
        { x: start.x + L3 + (L4 - L3) / 2, y: start.y + L1 },
        { x: start.x + L3, y: start.y + L1 },
        { x: start.x + L3, y: start.y },
        { x: start.x + L3 + (L4 - L3) / 2, y: start.y },
        { x: start.x + L3 + (L4 - L3) / 2, y: start.y - R },
        { x: start.x + L3, y: start.y - R - R / 2 },
        { x: start.x, y: start.y - R - R / 2 },
        { x: start.x - (L4 - L3) / 2, y: start.y - R },
        { x: start.x - (L4 - L3) / 2, y: start.y },
      ]}
      modifiers={modifiers}
      closed
    />
  );
};

export default OuterShape;