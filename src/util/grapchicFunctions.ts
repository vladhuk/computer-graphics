import Affine from '../types/Affine';
import Coord from '../types/Coord';
import PointModifier from '../types/PointModifier';
import Projective from '../types/Projective';

export function bindOffsetPoint(offset: Coord): PointModifier {
  return ({ x, y }) => ({
    x: x + offset.x,
    y: y + offset.y,
  });
}

export function degreesToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function bindCalculateWithOffset(
  func: PointModifier,
  offset: Coord
): PointModifier {
  return (point) => {
    const basePoint = {
      x: point.x - offset.x,
      y: point.y - offset.y,
    };

    const modifiedPoint = func(basePoint);

    return {
      x: modifiedPoint.x + offset.x,
      y: modifiedPoint.y + offset.y,
    };
  };
}

export function bindRotatePointByDegreesWithPivot(
  degreess: number,
  pivot: Coord
): PointModifier {
  const rad = degreesToRad(degreess);
  const rotate = bindRotatePointByRad(rad);

  return bindCalculateWithOffset(rotate, pivot);
}

function bindRotatePointByRad(rad: number): PointModifier {
  return ({ x, y }) => ({
    x: x * Math.cos(-rad) + y * Math.sin(rad),
    y: x * Math.sin(-rad) + y * Math.cos(-rad),
  });
}

export function bindAffinePointWithOffset(
  affinePoint: Affine,
  offset: Coord
): PointModifier {
  const affine = bindAffinePoint(affinePoint);

  return bindCalculateWithOffset(affine, offset);
}

function bindAffinePoint({ r0, rX, rY }: Affine): PointModifier {
  return ({ x, y }) => ({
    x: r0.x + x * rX.x - y * rY.x,
    y: -r0.y - x * rX.y + y * rY.y,
  });
}

export function bindProjectivePointWithOffset(
  projectivePoint: Projective,
  offset: Coord
): PointModifier {
  const projective = bindProjectivePoint(projectivePoint);

  return bindCalculateWithOffset(projective, offset);
}

export function bindProjectivePoint({
  r0,
  rX,
  rY,
  w0,
  w,
}: Projective): PointModifier {
  return ({ x, y }) => ({
    x: (r0.x * w0 + x * rX.x * w.x - y * rY.x * w.y) / (w0 + x * w.x - y * w.y),
    y:
      (-r0.y * w0 - x * rX.y * w.x + y * rY.y * w.y) / (w0 + x * w.x - y * w.y),
  });
}
