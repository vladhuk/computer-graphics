import Coord from '../../../types/Coord';
import Line from '../../../types/Line';
import DescartesFolium from './DescartesFolium';

// eslint-disable-next-line import/prefer-default-export
export function getCurveLines(
  descartesFolium: DescartesFolium,
  maxCoord: Coord
): Line[] {
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

  return [firstBranchPoints, secondBranchPoints];
}
