import PointsPair from './PointsPair';

/**
 * First point in the points pair is a bezier point for curve constructing.
 * Second point in the pair is a end point of curve.
 *
 * So the first point of every next line is an end point of previous pair
 * and we don't need to specify it.
 */
export default interface PicturePart {
  points: PointsPair;
  isContinuous?: boolean;
}
