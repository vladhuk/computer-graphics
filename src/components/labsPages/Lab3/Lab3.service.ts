import { range } from 'lodash';
import Coord from '../../../types/Coord';

// eslint-disable-next-line import/prefer-default-export
export function getFrames(
  picturePoints1: Coord[][],
  picturePoints2: Coord[][],
  framesAmount: number
): Coord[][][] {
  const [points1, points2] = fixPointsAmountDifference(
    picturePoints1,
    picturePoints2
  );

  const frames = range(1, framesAmount + 1).map((frameCount) =>
    points1.map((pointsPair, i) =>
      pointsPair.map((point, j) => ({
        x: point.x - ((point.x - points2[i][j].x) / framesAmount) * frameCount,
        y: point.y - ((point.y - points2[i][j].y) / framesAmount) * frameCount,
      }))
    )
  );

  return [picturePoints1, ...frames, picturePoints2];
}

function fixPointsAmountDifference(
  points1: Coord[][],
  points2: Coord[][]
): [Coord[][], Coord[][]] {
  const diff = Math.abs(points1.length - points2.length);

  return points1.length < points2.length
    ? [[...points1.slice(0, diff), ...points1], points2]
    : [points1, [...points2.slice(0, diff), ...points2]];
}
