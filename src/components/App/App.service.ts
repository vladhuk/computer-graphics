import Coord from '../../types/Coord';

/**
 * Convert coordinate in pixels to ratio to axes max coordinates
 *
 * @param vector Coordinate value in pixels
 * @returns Ratio of vector to axes max coordinates
 */
// eslint-disable-next-line import/prefer-default-export
export function bindNormalizeVectorValueToAxesMaxCoord(
  maxCoord: Coord
): (vector: Coord) => Coord {
  return (vector) => ({
    x: vector.x / maxCoord.x,
    y: vector.y / maxCoord.y,
  });
}
