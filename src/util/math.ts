import UndefinedZCoordinateError from '../errors/UndefinedZCoordinateError';
import PointModifier from '../types/PointModifier';

export function degreesToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function bindCreateOnePointPerspective(
  viewPoint: number
): PointModifier {
  return ({ x, y, z }) => {
    if (z === undefined) {
      throw new UndefinedZCoordinateError();
    }

    const r = 1 / viewPoint;
    const t = -r * z + 1;

    return {
      x: x / t,
      y: y / t,
      z: 0,
    };
  };
}
