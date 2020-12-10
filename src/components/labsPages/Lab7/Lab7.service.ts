import { clone } from 'lodash';
import Coord from '../../../types/Coord';
import Line from '../../../types/Line';
import { bindRotatePointByDegreesWithPivot } from '../../App/App.service';

// eslint-disable-next-line import/prefer-default-export
export function getKochQuadraticCurveLine(
  initialPoints: Coord[],
  fractalDepth: number
): Line {
  if (fractalDepth === 0) {
    return initialPoints;
  }

  const initialPointsLength = initialPoints.length;

  const angles = [90, -90, -90, 90];

  const newParts: Coord[] = angles.reduce((acc, angle) => {
    const lastAddedPart = acc.slice(acc.length - initialPointsLength);
    const newMovedPart = moveLineForward(lastAddedPart);
    const rotatedPart = rotateLine(newMovedPart, angle);
    return [...acc, ...rotatedPart];
  }, clone(initialPoints));

  return getKochQuadraticCurveLine(newParts, fractalDepth - 1);
}

function moveLineForward(points: Coord[]): Coord[] {
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const diff: Coord = {
    x: lastPoint.x - firstPoint.x,
    y: lastPoint.y - firstPoint.y,
  };

  return points.map(({ x, y }) => ({ x: x + diff.x, y: y + diff.y }));
}

function rotateLine(points: Coord[], angle: number): Coord[] {
  return points
    .map((point) => bindRotatePointByDegreesWithPivot(angle, points[0])(point))
    .slice(1);
}
