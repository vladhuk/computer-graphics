import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import ModifiableLine from '../../modifiableKonvaShapes/ModifiableLine';
import DescartesFolium from './DescartesFolium';

interface Props {
  descartesFolium: DescartesFolium;
  maxCoord: Coord;
  modifiers?: PointModifier[];
}

const Curve: FunctionComponent<Props> = ({
  descartesFolium,
  maxCoord,
  modifiers,
}) => {
  const firstBranchPoints: Coord[] = [];
  const secondBranchPoints: Coord[] = [];

  for (let i = 0; i <= 180; i += 1) {
    const point = descartesFolium.getPoint(i);
    if (
      firstBranchPoints.length < 90 ||
      (Math.abs(point.x) < maxCoord.x * 2 && Math.abs(point.y) < maxCoord.y * 2)
    ) {
      if (i <= 135) {
        firstBranchPoints.push(point);
      } else {
        secondBranchPoints.push(point);
      }
    }
  }

  return (
    <>
      <ModifiableLine points={firstBranchPoints} modifiers={modifiers} />
      <ModifiableLine points={secondBranchPoints} modifiers={modifiers} />
    </>
  );
};

export default Curve;
