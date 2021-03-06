import Coord from '../../../types/Coord';
import { getMultiplePoints } from '../modifiableKonvaShapes.service';
import BezierLine from './BezierLine';

function fixBezierOrder(endPoints: number[]): number[] {
  return endPoints.length <= 4
    ? fixBezierOrder([0, 0, ...endPoints])
    : endPoints;
}

// eslint-disable-next-line import/prefer-default-export
export function buildBezierLine(
  startPoint: Coord,
  bezierTailPoints: Coord[]
): BezierLine {
  return {
    start: startPoint,
    tail: [
      0,
      0,
      ...fixBezierOrder(getMultiplePoints(startPoint, bezierTailPoints)),
    ],
  };
}
