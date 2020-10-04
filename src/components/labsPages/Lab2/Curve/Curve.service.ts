import Coord from '../../../../types/Coord';
import { degreesToRad } from '../../../../util/grapchicFunctions';

// eslint-disable-next-line import/prefer-default-export
export function bindCalculateDescartesFoliumPoint(
  a: number
): (phi: number) => Coord {
  return (phi) => {
    const rad = degreesToRad(phi);
    const t = Math.tan(rad);

    return {
      x: (3 * a * t) / (1 + t ** 3),
      y: -(3 * a * t ** 2) / (1 + t ** 3),
    };
  };
}
