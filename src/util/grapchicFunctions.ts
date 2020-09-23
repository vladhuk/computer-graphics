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

export function bindScalePoint(
  scale0: Coord,
  scaleX: Coord,
  scaleY: Coord,
  center: Coord
): PointModifier {
  return ({ x, y }) => ({
    x: scale0.x + x * scaleX.x + y * scaleX.y - center.x * (scaleX.x - 1),
    y: scale0.y + x * scaleY.x + y * scaleY.y - center.y * (scaleY.y - 1),
  });
}
