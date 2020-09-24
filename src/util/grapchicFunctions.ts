import Coord from '../types/Coord';
import PointModifier from '../types/PointModifier';

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
  affine0: Coord,
  affineX: Coord,
  affineY: Coord,
  center: Coord
): PointModifier {
  return ({ x, y }) => ({
    x: affine0.x + x * affineX.x + y * affineX.y - center.x * (affineX.x - 1),
    y: -affine0.y + x * affineY.x + y * affineY.y - center.y * (affineY.y - 1),
  });
}
