import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { ModifiableLine } from '../../../modifiableKonvaShapes';
import { bindCalculateDescartesFoliumPoint } from './Curve.service';

interface Props {
  a: number;
  maxCoord: Coord;
  modifiers?: PointModifier[];
}

const Curve: FunctionComponent<Props> = ({ a, maxCoord, modifiers }) => {
  const calculateDescartesFoliumPoint = bindCalculateDescartesFoliumPoint(a);

  const firstBranchPoints: Coord[] = [];
  const secondBranchPoints: Coord[] = [];

  for (let i = 0; i <= 180; i += 1) {
    const point = calculateDescartesFoliumPoint(i);
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
      <ModifiableLine
        from={firstBranchPoints[0]}
        to={firstBranchPoints.slice(1)}
        modifiers={modifiers}
      />
      <ModifiableLine
        from={secondBranchPoints[0]}
        to={secondBranchPoints.slice(1)}
        modifiers={modifiers}
      />
    </>
  );
};

export default Curve;
