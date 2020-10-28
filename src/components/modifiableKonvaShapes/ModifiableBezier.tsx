import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';
import { ModifiableLinearShape } from '../../types/ModifiableShape';
import {
  applyModifiers,
  getMultiplePoints,
} from './modifiableKonvaShapes.service';

interface Props extends ModifiableLinearShape {
  from: Coord;
  to: Coord[][];
}

interface BesierLine {
  start: Coord;
  points: number[];
}

function fixBezierOrder(endPoints: number[]): number[] {
  return endPoints.length <= 4 ? [0, 0, ...endPoints] : endPoints;
}

const ModifiableBezier: FunctionComponent<Props> = ({
  from,
  to,
  modifiers,
  color,
  closed,
  ...rest
}) => {
  const startPoint = modifiers ? applyModifiers(from, modifiers) : from;

  const modifiedEndPoints: Coord[][] = modifiers
    ? to.map((bezierEndPoint) =>
        bezierEndPoint.map((point) => applyModifiers(point, modifiers))
      )
    : to;

  const bezierLines: BesierLine[] = [];

  const firstLine: BesierLine = {
    start: startPoint,
    points: [
      0,
      0,
      ...fixBezierOrder(getMultiplePoints(startPoint, modifiedEndPoints[0])),
    ],
  };

  const otherLines = modifiedEndPoints.slice(1).map((current, i) => {
    const prevLinePoints = modifiedEndPoints[i];
    const prevEndPoint = prevLinePoints[prevLinePoints.length - 1];

    return {
      start: prevEndPoint,
      points: [
        0,
        0,
        ...fixBezierOrder(getMultiplePoints(prevEndPoint, current)),
      ],
    };
  });

  bezierLines.push(firstLine);
  bezierLines.push(...otherLines);

  if (closed) {
    const prevLinePoints = modifiedEndPoints[modifiedEndPoints.length - 1];
    const prevEndPoint = prevLinePoints[prevLinePoints.length - 1];

    bezierLines.push({
      start: prevEndPoint,
      points: [
        0,
        0,
        0,
        0,
        0,
        0,
        ...getMultiplePoints(prevEndPoint, [startPoint]),
      ],
    });
  }

  return (
    <>
      {bezierLines.map((line) => (
        <Line
          x={line.start.x}
          y={line.start.y}
          points={line.points}
          stroke={color || 'black'}
          bezier
          {...rest}
        />
      ))}
    </>
  );
};

export default ModifiableBezier;
