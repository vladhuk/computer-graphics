import React, { FunctionComponent } from 'react';
import { Circle } from 'react-konva';
import Coord from '../../types/Coord';

interface Props {
  pivot: Coord;
}

const Pivot: FunctionComponent<Props> = ({ pivot }) => (
  <Circle radius={5} x={pivot.x} y={pivot.y} fill="red" />
);

export default Pivot;
