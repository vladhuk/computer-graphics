import Coord from './Coord';

export interface ProjectiveCoord extends Coord {
  w: number;
}

export default interface Projective {
  r0: ProjectiveCoord;
  rX: ProjectiveCoord;
  rY: ProjectiveCoord;
}
