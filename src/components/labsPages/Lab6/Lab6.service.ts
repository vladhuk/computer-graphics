import { range } from 'lodash';
import Coord from '../../../types/Coord';
import { Line } from '../../modifiableKonvaShapes/ModifiableLine';

// eslint-disable-next-line import/prefer-default-export
export function getEllipticParaboloidLines({
  l,
  a,
  b,
  gridDensity,
}: {
  l: number;
  a: number;
  b: number;
  gridDensity: number;
}): Line[] {
  const step = (l * 2) / gridDensity;

  const points1: Coord[][] = range(-l, l, step).map((x) =>
    range(-l, l, 15).map((z) => ({
      z,
      x,
      y: getY(z, x, a, b),
    }))
  );
  const points2: Coord[][] = range(-l, l, step).map((z) =>
    range(-l, l, 15).map((x) => ({
      z,
      x,
      y: getY(z, x, a, b),
    }))
  );

  return [...points1, ...points2].map((pointsLine) => ({
    from: pointsLine[0],
    to: pointsLine.slice(1),
  }));
}

function getY(z: number, x: number, a: number, b: number): number {
  return z ** 2 / a ** 2 + x ** 2 / b ** 2;
}
