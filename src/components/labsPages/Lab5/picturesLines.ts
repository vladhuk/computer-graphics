import Coord from '../../../types/Coord';
import { Line } from '../../modifiableKonvaShapes/ModifiableLine';

type CoordSet = [number, number, number];

function mapArrayToCoord([x, y, z]: number[]): Coord {
  return { x, y, z };
}

// eslint-disable-next-line import/prefer-default-export
export function getHouseLines({
  L,
  H,
  R1,
  R2,
  W,
}: {
  L: number;
  H: number;
  R1: number;
  R2: number;
  W: number;
}): Line[] {
  const l = L / 2;
  const h = H / 3;
  const drl1 = (R1 - L) / 2;
  const drl2 = (R2 - L) / 2;
  const rl1 = l + drl1;
  const rl2 = l + drl2;
  const w = W / 2;
  const Wl = W + l;

  const coordSets: [CoordSet, CoordSet[]][] = [
    // Floor 1
    [
      [-l, -h, -l],
      [
        [l, -h, -l],
        [l, -h, l],
        [-l, -h, l],
        [-l, -h, -l],
      ],
    ],
    // Floor 2
    [
      [-l, h, -l],
      [
        [-w, h * 2 - W, -l],
        [w, h * 2 - W, -l],
        [l, h, -l],
        [l, h, -rl1],
        [Wl, h, -rl1],
        [Wl, h, rl1],
        [l, h, rl1],
        [l, h, l],
        [w, h * 2 - W, l],
        [-w, h * 2 - W, l],
        [-l, h, l],
        [-l, h, rl1],
        [-Wl, h, rl1],
        [-Wl, h, -rl1],
        [-l, h, -rl1],
        [-l, h, -l],
      ],
    ],
    [[-l, h, -l], [[-l, h, l]]],
    [[l, h, -l], [[l, h, l]]],
    // Floor 3
    [
      [-w, h * 2, -rl2],
      [
        [w, h * 2, -rl2],
        [w, h * 2, rl2],
        [-w, h * 2, rl2],
        [-w, h * 2, -rl2],
      ],
    ],
    // Between floors 1 and 2
    [[-l, -h, -l], [[-l, h, -l]]],
    [[l, -h, -l], [[l, h, -l]]],
    [[l, -h, l], [[l, h, l]]],
    [[-l, -h, l], [[-l, h, l]]],
    // Between floors 2 and 3
    [[-Wl, h, rl1], [[-w, h * 2, rl2]]],
    [[Wl, h, rl1], [[w, h * 2, rl2]]],
    [[-Wl, h, -rl1], [[-w, h * 2, -rl2]]],
    [[Wl, h, -rl1], [[w, h * 2, -rl2]]],
    [
      [-l, h, rl1],
      [
        [-w, h * 2 - W, rl2],
        [w, h * 2 - W, rl2],
        [l, h, rl1],
      ],
    ],
    [
      [-l, h, -rl1],
      [
        [-w, h * 2 - W, -rl2],
        [w, h * 2 - W, -rl2],
        [l, h, -rl1],
      ],
    ],
    [[-w, h * 2 - W, l], [[-w, h * 2 - W, rl2]]],
    [[-w, h * 2 - W, -l], [[-w, h * 2 - W, -rl2]]],
    [[w, h * 2 - W, l], [[w, h * 2 - W, rl2]]],
    [[w, h * 2 - W, -l], [[w, h * 2 - W, -rl2]]],
    // Door
    [
      [-l / 3, -h, l],
      [
        [-l / 3, 0, l],
        [l / 3, 0, l],
        [l / 3, -h, l],
      ],
    ],
  ];

  return coordSets.map(([from, to]) => ({
    from: mapArrayToCoord(<number[]>from),
    to: (<number[][]>to).map(mapArrayToCoord),
  }));
}
