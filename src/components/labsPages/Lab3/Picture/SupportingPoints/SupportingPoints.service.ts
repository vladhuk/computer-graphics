import { clone, cloneDeep } from 'lodash';
import Coord from '../../../../../types/Coord';
import PicturePart from '../../PicturePart';

interface OnPointMoveArgs {
  parts: PicturePart[];
  setParts?: (parts: PicturePart[]) => void;
  draggedPoint: Coord;
  pointIndex: number;
  part: PicturePart;
  partIndex: number;
}

export function onPointMove({
  parts,
  setParts,
  draggedPoint,
  pointIndex,
  part,
  partIndex,
}: OnPointMoveArgs): void {
  if (!setParts) {
    return;
  }

  const newPart = cloneDeep(part);
  const newParts = clone(parts);

  replaceDraggedPoint(newParts, newPart, partIndex, draggedPoint, pointIndex);
  replaceContinuousPoint(newParts, newPart, partIndex);

  setParts(newParts);
}

function replaceDraggedPoint(
  newParts: PicturePart[],
  newPart: PicturePart,
  partIndex: number,
  draggedPoint: Coord,
  pointIndex: number
): void {
  newPart.points.splice(pointIndex, 1, draggedPoint);
  newParts.splice(partIndex, 1, newPart);
}

function replaceContinuousPoint(
  newParts: PicturePart[],
  newPart: PicturePart,
  partIndex: number
): void {
  if (newPart.isContinuous && newParts.length > 1) {
    const prevIndex = partIndex ? partIndex - 1 : newParts.length - 1;
    const nextIndex = partIndex === newParts.length - 1 ? 0 : partIndex + 1;

    const prevPart = newParts[prevIndex];
    const nextPart = newParts[nextIndex];

    if (prevPart.isContinuous) {
      const newPrevPart = getContinuousPart(
        newPart,
        prevPart,
        prevPart.points[1]
      );
      newParts.splice(prevIndex, 1, newPrevPart);
    }
    if (nextPart.isContinuous) {
      const newNextPart = getContinuousPart(
        newPart,
        nextPart,
        newPart.points[1]
      );
      newParts.splice(nextIndex, 1, newNextPart);
    }
  }
}

function getContinuousPart(
  part: PicturePart,
  anotherPart: PicturePart,
  point: Coord
): PicturePart {
  const newAnotherPart = cloneDeep(anotherPart);
  newAnotherPart.points[0] = calclulateContinuousBezierPoint(
    part.points[0],
    point
  );
  return newAnotherPart;
}

function calclulateContinuousBezierPoint(
  bezierPoint: Coord,
  point: Coord
): Coord {
  return {
    x: 2 * point.x - bezierPoint.x,
    y: 2 * point.y - bezierPoint.y,
  };
}

export function getPointColor(
  pointIndex: number,
  isContinuous: boolean
): string {
  if (pointIndex) {
    return 'skyblue';
  }
  if (isContinuous) {
    return 'lightgreen';
  }
  return 'hotpink';
}
