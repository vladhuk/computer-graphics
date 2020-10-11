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

  private static getT(degrees: number): number {
    return Math.tan(degreesToRad(degrees));
  }

  calculateDerivativeY(x: number): number {
    return (
      (2 * this.l * x) /
        ((this.l - 3 * x) *
          (Math.sqrt(this.l - 3 * x) * Math.sqrt(this.l + x))) +
      Math.sqrt((this.l + x) / (this.l - 3 * x))
    );
  }

  /**
   * When folium is rotated on 135 deg
   */
  calculateY(x: number): number {
    return x * Math.sqrt((this.l + x) / (this.l - 3 * x));
  }

  bindGetTangentY(x0: number): (x: number) => number {
    const fx0 = this.calculateY(x0);
    const dfx0 = this.calculateDerivativeY(x0);

    return (x) => dfx0 * (x - x0) + fx0;
  }

  bindGetNormalY(x0: number): (x: number) => number {
    const fx0 = this.calculateY(x0);
    const dfx0 = this.calculateDerivativeY(x0);

    return (x) => -(1 / dfx0) * (x - x0) + fx0;
  }
}
