import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { bindOffsetPoint } from '../../../../util/grapchicFunctions';
import { ModifiableLine } from '../../../modifiableKonvaShapes';
import { bindCalculateDescartesFoliumPoint } from './Curve.service';

interface Props {
  a: number;
  center: Coord;
  modifiers?: PointModifier[];
}

const Curve: FunctionComponent<Props> = ({ a, center, modifiers }) => {
  const calculateDescartesFoliumPoint = bindCalculateDescartesFoliumPoint(a);

  const points: Coord[] = [];

  for (let i = 0; i < 360; i += 1) {
    const point = calculateDescartesFoliumPoint(i);
    if (points.length < 90 || Math.abs(point.x) < points[45].x * 2) {
      points.push(point);
    }
  }

  const curveModifiers = [bindOffsetPoint(center), ...(modifiers || [])];

  return (
    <>
      <ModifiableLine
        from={points[0]}
        to={points.slice(1)}
        modifiers={curveModifiers}
        closed
      />
    </>
  );
};

export default Curve;
