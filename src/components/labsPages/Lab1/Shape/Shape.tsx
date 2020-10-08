import React, { FunctionComponent } from 'react';
import OuterShape from './elements/OuterShape';
import InnerShape from './elements/InnerShape';
import PointModifier from '../../../../types/PointModifier';

interface Props {
  R: number;
  L1: number;
  L2: number;
  L3: number;
  L4: number;
  modifiers?: PointModifier[];
}

const Shape: FunctionComponent<Props> = ({ R, L1, L2, L3, L4, modifiers }) => (
  <>
    <OuterShape R={R} L1={L1} L3={L3} L4={L4} modifiers={modifiers} />
    <InnerShape R={R} L1={L1} L2={L2} modifiers={modifiers} />
  </>
);

export default Shape;
