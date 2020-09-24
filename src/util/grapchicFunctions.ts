import Affine from '../types/Affine';
import Coord from '../types/Coord';
import PointModifier from '../types/PointModifier';
import Projective, { ProjectiveCoord } from '../types/Projective';

export function bindOffsetPoint(offset: Coord): PointModifier {
  return ({ x, y }) => ({
    x: x + offset.x,
    y: y + offset.y,
  });
}

export function degreesToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function bindRotatePoint(degreess: number, pivot: Coord): PointModifier {
  const rad = degreesToRad(degreess);

  return ({ x, y }) => ({
    x: (x - pivot.x) * Math.cos(rad) - (y - pivot.y) * Math.sin(rad) + pivot.x,
    y: (x - pivot.x) * Math.sin(rad) + (y - pivot.y) * Math.cos(rad) + pivot.y,
  });
}

export function bindAffinePoint(
  { r0, rX, rY }: Affine,
  center: Coord
): PointModifier {
  return ({ x, y }) => ({
    x: r0.x + x * rX.x - y * rY.x - center.x * (rX.x - 1) + center.y * rY.x,
    y: -r0.y - x * rX.y + y * rY.y + center.x * rX.y - center.y * (rY.y - 1),
  });
}

export function bindProjectivePoint(
  { r0, rX, rY }: Projective,
  center: Coord
): PointModifier {
  return ({ x, y }) => ({
    x,
    y,
  });
}
