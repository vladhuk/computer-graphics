import Coord from '../../../types/Coord';
import { degreesToRad } from '../../../util/grapchicFunctions';

export default class DescartesFolium {
  private a: number;

  private l: number;

  constructor(a: number) {
    this.a = a;
    this.l = DescartesFolium.getL(a);
  }

  private static getL(a: number): number {
    return (3 * a) / Math.sqrt(2);
  }

  /**
   * If pass x, returns y and vice versa
   */
  getAsymtoteSecondCoordParam(param: number): number {
    return -this.a - param;
  }

  getPoint(phi: number): Coord {
    const t = DescartesFolium.getT(phi);

    return {
      x: (3 * this.a * t) / (1 + t ** 3),
      y: (3 * this.a * t ** 2) / (1 + t ** 3),
    };
  }

  private static getT(phi: number): number {
    return Math.tan(degreesToRad(phi));
  }

  getDerivativePoint(phi: number): Coord {
    const t = DescartesFolium.getT(phi);

    return {
      x:
        (-9 * this.a * t ** 3) / (t ** 3 + 1) ** 2 +
        3 * (this.a / (t ** 3 + 1)),
      y:
        (-9 * this.a * t ** 4) / (t ** 3 + 1) ** 2 +
        6 * ((this.a * t) / (t ** 3 + 1)),
    };
  }

  getSecondDerivativePoint(phi: number): Coord {
    const t = DescartesFolium.getT(phi);

    return {
      x:
        (54 * this.a * t ** 5) / (t ** 3 + 1) ** 3 -
        36 * this.a * (t ** 2 / (t ** 3 + 1) ** 2),
      y:
        (54 * this.a * t ** 6) / (t ** 3 + 1) ** 3 -
        54 * this.a * (t ** 3 / (t ** 3 + 1) ** 2) +
        (6 * this.a) / (t ** 3 + 1),
    };
  }

  bindGetTangentY(phi0: number): (x: number) => number {
    const point = this.getPoint(phi0);
    const dPoint = this.getDerivativePoint(phi0);

    return (x) => (dPoint.y / dPoint.x) * (x - point.x) + point.y;
  }

  bindGetNormalY(phi0: number): (x: number) => number {
    const point = this.getPoint(phi0);
    const dPoint = this.getDerivativePoint(phi0);

    return (x) => -(dPoint.x / dPoint.y) * (x - point.x) + point.y;
  }

  calculateS(): number {
    return (3 / 2) * this.a ** 2;
  }

  // TODO: Fix
  calculateCurvatureR(phi: number): number {
    const dPoint = this.getDerivativePoint(phi);
    const ddPoint = this.getSecondDerivativePoint(phi);

    return (
      Math.abs(dPoint.x * ddPoint.y - dPoint.y * ddPoint.x) /
      (dPoint.x ** 2 + dPoint.y ** 2) ** 1.5
    );
  }
}
