import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { bindRotatePointByDeegrees } from '../../../../util/grapchicFunctions';
import DescartesFolium from '../DescartesFolium';
import TangentLine from './TangentLine';
import TangentLinePivot from './TangentLinePivot';

interface Props {
  maxCoord: Coord;
  descartesFolium: DescartesFolium;
  tangentX: number;
  color?: string;
  modifiers?: PointModifier[];
}

const Tangent: FunctionComponent<Props> = ({
  maxCoord,
  descartesFolium,
  tangentX,
  color,
  modifiers,
}) => {
  const tangentLineModifiers: PointModifier[] = [
    bindRotatePointByDeegrees(-135),
    ...(modifiers || []),
  ];

  const defaultProps = {
    maxCoord,
    descartesFolium,
    color,
    modifiers: tangentLineModifiers,
  };

  return (
    <>
      <TangentLinePivot x={tangentX} {...defaultProps} />
      <TangentLinePivot x={tangentX} {...defaultProps} invert />
      <TangentLine x0={tangentX} {...defaultProps} />
      <TangentLine x0={tangentX} {...defaultProps} invert />
    </>
  );
};

export default Tangent;
