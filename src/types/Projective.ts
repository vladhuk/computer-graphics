import Coord from './Coord';

export default interface Projective {
  r0: Coord;
  rX: Coord;
  rY: Coord;
  w0: number;
  w: Coord;
}
