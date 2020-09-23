import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import OuterFigure from './elements/OuterFigure';
import InnerFigure from './elements/InnerFigure';
import PointModifier from '../../types/PointModifier';
import { bindRotatePoint } from '../../util/grapchicFunctions';

interface Props {
  center: Coord;
  R: number;
  L1: number;
  L2: number;
  L3: number;
  L4: number;
  offset: Coord;
  pivot: Coord;
  rotate: number;
}

const Figure: FunctionComponent<Props> = ({
  center,
  R,
  L1,
  L2,
  L3,
  L4,
  offset,
  pivot,
  rotate,
}) => {
  const offsetCenter: Coord = {
    x: center.x + offset.x,
    y: center.y + offset.y,
  };

  const pointModifiers: PointModifier[] = [bindRotatePoint(rotate, pivot)];

  return (
    <>
      <OuterFigure
        center={offsetCenter}
        R={R}
        L1={L1}
        L3={L3}
        L4={L4}
        pointModifiers={pointModifiers}
      />
      <InnerFigure
        center={offsetCenter}
        R={R}
        L1={L1}
        L2={L2}
        pointModifiers={pointModifiers}
      />
    </>
  );
};

export default Figure;
