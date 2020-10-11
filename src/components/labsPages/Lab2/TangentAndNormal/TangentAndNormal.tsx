import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { bindRotatePointByDeegrees } from '../../../../util/grapchicFunctions';
import DescartesFolium from '../DescartesFolium';
import Normal from './Normal';
import Tangent from './Tangent';
import TangentAndNormalPivot from './TangentAndNormalPivot';

interface Props {
  maxCoord: Coord;
  descartesFolium: DescartesFolium;
  x0: number;
  tangentColor?: string;
  normalColor?: string;
  modifiers?: PointModifier[];
}

const TangentAndNormal: FunctionComponent<Props> = ({
  maxCoord,
  descartesFolium,
  x0,
  tangentColor,
  normalColor,
  modifiers,
}) => {
  const tangentLineModifiers: PointModifier[] = [
    bindRotatePointByDeegrees(-135),
    ...(modifiers || []),
  ];

  const defaultProps = {
    x0,
    maxCoord,
    descartesFolium,
    modifiers: tangentLineModifiers,
  };

  return (
    <>
      <Tangent color={tangentColor} {...defaultProps} />
      <Tangent color={tangentColor} {...defaultProps} invert />
      <Normal color={normalColor} {...defaultProps} />
      <Normal color={normalColor} {...defaultProps} invert />
      <TangentAndNormalPivot color={tangentColor} {...defaultProps} />
      <TangentAndNormalPivot color={tangentColor} {...defaultProps} invert />
    </>
  );
};

export default TangentAndNormal;
