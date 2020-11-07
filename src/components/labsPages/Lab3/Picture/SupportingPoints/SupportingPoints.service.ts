import Coord from '../../../../../types/Coord';

interface OnPointMoveArgs {
  points: Coord[][];
  setPoints?: (points: Coord[][]) => void;
  draggedPoint: Coord;
  pointIndex: number;
  pointsPair: Coord[];
  pairIndex: number;
}

// eslint-disable-next-line import/prefer-default-export
export function onPointMove({
  points,
  setPoints,
  draggedPoint,
  pointIndex,
  pointsPair,
  pairIndex,
}: OnPointMoveArgs): void {
  if (!setPoints) {
    return;
  }

  const splicedPair = pointsPair.slice();
  splicedPair.splice(pointIndex, 1, draggedPoint);

  const splicedPoints = points.slice();
  splicedPoints.splice(pairIndex, 1, splicedPair);

  setPoints(splicedPoints);
}
