import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import DescartesFolium from './DescartesFolium';
import X0Line from './X0Line';
import X0Point from './X0Point';

interface Props {
  maxCoord: Coord;
  descartesFolium: DescartesFolium;
  x: number;
  color?: string;
  modifiers?: PointModifier[];
}

const Normal: FunctionComponent<Props> = ({
  maxCoord,
  descartesFolium,
  x,
  color,
  modifiers,
}) => {
  const f = descartesFolium.bindGetNormalY(x);

  const defaultProps = {
    x,
    f,
    maxCoord,
    descartesFolium,
    color,
    modifiers,
  };

  return (
    <>
      <X0Line {...defaultProps} />
      <X0Line {...defaultProps} invert />
      <X0Point {...defaultProps} />
      <X0Point {...defaultProps} invert />
    </>
  );
};

export default Normal;
