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
}

const Figure: FunctionComponent<Props> = ({ center, R, L1, L2, L3, L4 }) => {
  return (
    <>
      <OuterFigure center={center} R={R} L1={L1} L3={L3} L4={L4} />
      <InnerFigure center={center} R={R} L1={L1} L2={L2} />
    </>
  );
};

export default Figure;
