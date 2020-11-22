import { range } from 'lodash';
import Coord from '../../../types/Coord';
import PicturePart from './PicturePart';

// eslint-disable-next-line import/prefer-default-export
export function getFrames(
  pictureParts1: PicturePart[],
  pictureParts2: PicturePart[],
  framesAmount: number
): PicturePart[][] {
  const [points1, points2] = fixPointsAmountDifference(
    pictureParts1.map((part) => part.points),
    pictureParts2.map((part) => part.points)
  );

  const frames: PicturePart[][] = range(1, framesAmount + 1).map((frameCount) =>
    points1
      .map((pointsPair, i) =>
        pointsPair.map((point, j) => ({
          x:
            point.x - ((point.x - points2[i][j].x) / framesAmount) * frameCount,
          y:
            point.y - ((point.y - points2[i][j].y) / framesAmount) * frameCount,
        }))
      )
      .map((pointsPair) => ({ points: [pointsPair[0], pointsPair[1]] }))
  );

  return [pictureParts1, ...frames, pictureParts2];
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
