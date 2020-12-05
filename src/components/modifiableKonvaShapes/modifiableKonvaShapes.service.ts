import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';

export function getPoints(from: Coord, to: Coord): number[] {
  return [to.x - from.x, to.y - from.y];
}

export function getMultiplePoints(from: Coord, to: Coord[]): number[] {
  return to.flatMap((value) => getPoints(from, value));
}

export function applyModifiers(
  point: Coord,
  modifiers: PointModifier[]
): Coord {
  return modifiers.reduce((result, modifier) => {
    const value = modifier(result);
    return {
      ...value,
      z: value.z === undefined ? result.z : value.z,
    };
  }, point);
}
