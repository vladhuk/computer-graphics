import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import CoordLine from '../../CoordLine';

interface Props {
  center: Coord;
  R: number;
  L1: number;
  L3: number;
  L4: number;
  pointModifiers?: PointModifier[];
}

const OuterFigure: FunctionComponent<Props> = ({
  center,
  R,
  L1,
  L3,
  L4,
  pointModifiers,
}) => {
  const start: Coord = {
    x: center.x - L3 / 2,
    y: center.y + L1 / 2,
  };

  return (
    <CoordLine
      from={start}
      to={[
        { x: start.x, y: start.y - L1 },
        { x: start.x - (L4 - L3) / 2, y: start.y - L1 },
        { x: start.x - (L4 - L3) / 2, y: start.y - L1 - R },
        { x: start.x, y: start.y - L1 - R - R / 2 },
        { x: start.x + L3, y: start.y - L1 - R - R / 2 },
        { x: start.x + L3 + (L4 - L3) / 2, y: start.y - L1 - R },
        { x: start.x + L3 + (L4 - L3) / 2, y: start.y - L1 },
        { x: start.x + L3, y: start.y - L1 },
        { x: start.x + L3, y: start.y },
        { x: start.x + L3 + (L4 - L3) / 2, y: start.y },
        { x: start.x + L3 + (L4 - L3) / 2, y: start.y + R },
        { x: start.x + L3, y: start.y + R + R / 2 },
        { x: start.x, y: start.y + R + R / 2 },
        { x: start.x - (L4 - L3) / 2, y: start.y + R },
        { x: start.x - (L4 - L3) / 2, y: start.y },
      ]}
      modifiers={pointModifiers}
      closed
    />
  );
};

export default OuterFigure;
