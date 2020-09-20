import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import OuterFigure from './elements/OuterFigure';
import InnerFigure from './elements/InnerFigure';

interface Props {
  center: Coord;
  R: number;
  L1: number;
  L2: number;
  L3: number;
  L4: number;
  offset: Coord;
}

const Figure: FunctionComponent<Props> = ({
  center,
  R,
  L1,
  L2,
  L3,
  L4,
  offset,
}) => {
  const offsetCenter: Coord = {
    x: center.x + offset.x,
    y: center.y + offset.y,
  };

  return (
    <>
      <OuterFigure center={offsetCenter} R={R} L1={L1} L3={L3} L4={L4} />
      <InnerFigure center={offsetCenter} R={R} L1={L1} L2={L2} />
    </>
  );
};

export default Figure;
