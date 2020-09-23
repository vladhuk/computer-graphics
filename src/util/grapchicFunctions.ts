import Coord from '../types/Coord';

export function offsetPoint(point: Coord, offset: Coord): Coord {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
  };
}

export function degreesToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function bindRotatePoint(
  degreess: number,
  pivot: Coord
): (point: Coord) => Coord {
  const rad = degreesToRad(degreess);

  return ({ x, y }) => ({
    x: (x - pivot.x) * Math.cos(rad) - (y - pivot.y) * Math.sin(rad) + pivot.x,
    y: (x - pivot.x) * Math.sin(rad) + (y - pivot.y) * Math.cos(rad) + pivot.y,
  });
}
