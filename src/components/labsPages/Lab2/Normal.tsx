import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import DescartesFolium from './DescartesFolium';
import Phi0Line from './Phi0Line';
import Phi0Point from './Phi0Point';

interface Props {
  maxCoord: Coord;
  descartesFolium: DescartesFolium;
  phi: number;
  color?: string;
  modifiers?: PointModifier[];
}

const Normal: FunctionComponent<Props> = ({
  maxCoord,
  descartesFolium,
  phi,
  color,
  modifiers,
}) => {
  const f = descartesFolium.bindGetNormalY(phi);
  const pointPosition = descartesFolium.getPoint(phi);

  const defaultProps = {
    f,
    position: pointPosition,
    maxCoord,
    color,
    modifiers,
  };

  return (
    <>
      <Phi0Line {...defaultProps} />
      <Phi0Point {...defaultProps} />
    </>
  );
};

export default Normal;
