import Coord from '../../types/Coord';

/**
 * Convert coordinate in pixels to ratio to center
 *
 * @param vector Coordinate value in pixels
 * @param center Axes center
 * @returns Ratio of vector to center
 */
// eslint-disable-next-line import/prefer-default-export
export function bindNormalizeVectorValueToCenter(
  center: Coord
): (vector: Coord) => Coord {
  return (vector) => ({
    x: vector.x / center.x,
    y: vector.y / center.y,
  });
}
