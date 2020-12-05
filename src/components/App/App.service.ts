import Coord from '../../types/Coord';
import Affine from '../../types/Affine';
import PointModifier from '../../types/PointModifier';
import Projective from '../../types/Projective';
import { degreesToRad } from '../../util/math';

/**
 * Convert coordinate in pixels to ratio to axes max coordinates
 *
 * @param vector Coordinate value in pixels
 * @returns Ratio of vector to axes max coordinates
 */
export function bindNormalizeVectorValueToAxesMaxCoord(
  maxCoord: Coord
): PointModifier {
  return (vector) => ({
    x: vector.x / maxCoord.x,
    y: vector.y / maxCoord.y,
  });
}

export function bindInvertY(): PointModifier {
  return ({ x, y }) => ({ x, y: -y });
}

export function bindOffsetPoint(offset: Coord): PointModifier {
  return ({ x, y }) => ({
    x: x + offset.x,
    y: y + offset.y,
  });
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
  degrees: number,
  pivot: Coord
): PointModifier {
  const rotate = bindRotatePointByDeegrees(degrees);

  return bindCalculateWithOffset(rotate, pivot);
}

export function bindRotatePointByDeegrees(degrees: number): PointModifier {
  const rad = degreesToRad(degrees);

  return ({ x, y }) => ({
    x: x * Math.cos(rad) - y * Math.sin(rad),
    y: x * Math.sin(rad) + y * Math.cos(rad),
  });
}

export function bindAffinePoint({ r0, rX, rY }: Affine): PointModifier {
  return ({ x, y }) => ({
    x: r0.x + x * rX.x + y * rY.x,
    y: r0.y + x * rX.y + y * rY.y,
  });
}

export function bindProjectivePoint({
  r0,
  rX,
  rY,
  w0,
  w,
}: Projective): PointModifier {
  return ({ x, y }) => ({
    x: (r0.x * w0 + x * rX.x * w.x + y * rY.x * w.y) / (w0 + x * w.x + y * w.y),
    y: (r0.y * w0 + x * rX.y * w.x + y * rY.y * w.y) / (w0 + x * w.x + y * w.y),
  });
}
