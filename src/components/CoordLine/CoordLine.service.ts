import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';

export function getPoints(from: Coord, to: Coord[]): number[] {
  return to.flatMap((value) => [value.x - from.x, value.y - from.y]);
}

export function applyModifiers(
  point: Coord,
  modifiers: PointModifier[]
): Coord {
  return modifiers.reduce((result, modifier) => modifier(result), point);
}
