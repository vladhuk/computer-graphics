import Coord from './Coord';

export default interface PicturePart {
  points: [Coord, Coord];
  isContinuous?: boolean;
}
