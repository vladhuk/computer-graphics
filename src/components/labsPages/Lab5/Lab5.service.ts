import UndefinedZCoordinateError from '../../../errors/UndefinedZCoordinateError';
import PointModifier from '../../../types/PointModifier';

// eslint-disable-next-line import/prefer-default-export
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
