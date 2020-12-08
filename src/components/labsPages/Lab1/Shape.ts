import Coord from '../../../types/Coord';
import { Line } from '../../modifiableKonvaShapes/ModifiableLine';

interface ConstructorArgs {
  R: number;
  L1: number;
  L2: number;
  L3: number;
  L4: number;
}

export default class Shape {
  private R: number;
  private L1: number;
  private L2: number;
  private L3: number;
  private L4: number;

  constructor({ R, L1, L2, L3, L4 }: ConstructorArgs) {
    this.R = R;
    this.L1 = L1;
    this.L2 = L2;
    this.L3 = L3;
    this.L4 = L4;
  }

  getInnerShapeLines(): Line[] {
    const { L1, L2, R } = this;
    const circleLineLength = 1;

    const circleLines = [];

    for (let x = -R; x < R; x += circleLineLength) {
      if (x > L2 / 2 || x < -L2 / 2) {
        circleLines.push(this.getCircleLine(x, 1, circleLineLength));
      }
      circleLines.push(this.getCircleLine(x, -1, circleLineLength));
    }

    const xStart = -L2 / 2;
    const yStart = this.getCircleY(xStart, 1);
    const L1ExcludeCircle = L1 / 2 + yStart;

    const innerLine: Line = {
      points: [
        { x: xStart, y: yStart },
        { x: xStart, y: yStart + L1 - L1ExcludeCircle + R / 2 },
        {
          x: xStart + L2,
          y: yStart + L1 - L1ExcludeCircle + R / 2,
        },
        { x: xStart + L2, y: yStart },
      ],
    };

    return [innerLine, ...circleLines];
  }

  private getCircleLine(
    x: number,
    scale: number,
    circleLineLength: number
  ): Line {
    return {
      points: [
        { x, y: this.getCircleY(x, scale) },
        {
          x: x + circleLineLength,
          y: this.getCircleY(x + circleLineLength, scale),
        },
      ],
    };
  }

  private getCircleY(x: number, scale: number): number {
    const circleCenter: Coord = { x: 0, y: -this.L1 / 2 };
    return (
      Math.sqrt(Math.abs(this.R ** 2 - (x - circleCenter.x) ** 2)) * scale +
      circleCenter.y
    );
  }

  getOuterShapePoints(): Coord[] {
    const { L1, L3, L4, R } = this;

    const start: Coord = {
      x: -L3 / 2,
      y: -L1 / 2,
    };

    return [
      start,
      { x: start.x, y: start.y + L1 },
      { x: start.x - (L4 - L3) / 2, y: start.y + L1 },
      { x: start.x - (L4 - L3) / 2, y: start.y + L1 + R },
      { x: start.x, y: start.y + L1 + R + R / 2 },
      { x: start.x + L3, y: start.y + L1 + R + R / 2 },
      { x: start.x + L3 + (L4 - L3) / 2, y: start.y + L1 + R },
      { x: start.x + L3 + (L4 - L3) / 2, y: start.y + L1 },
      { x: start.x + L3, y: start.y + L1 },
      { x: start.x + L3, y: start.y },
      { x: start.x + L3 + (L4 - L3) / 2, y: start.y },
      { x: start.x + L3 + (L4 - L3) / 2, y: start.y - R },
      { x: start.x + L3, y: start.y - R - R / 2 },
      { x: start.x, y: start.y - R - R / 2 },
      { x: start.x - (L4 - L3) / 2, y: start.y - R },
      { x: start.x - (L4 - L3) / 2, y: start.y },
    ];
  }
}
