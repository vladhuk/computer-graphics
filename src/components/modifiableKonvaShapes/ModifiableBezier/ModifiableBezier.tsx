import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../../types/Coord';
import { ModifiableLinearShape } from '../../../types/ModifiableShape';
import { applyModifiers } from '../modifiableKonvaShapes.service';
import BezierLine from './BezierLine';
import { buildBezierLine } from './ModifiableBezier.service';

interface Props extends ModifiableLinearShape {
  from: Coord;
  to: Coord[][];
}

/**
 * @param to The first part of array is the bezier points and the last element is an
 *   end point. You don't need to specify a start point of the next part of
 *   curve, it will be taken from end point of previous part of curve.
 */
const ModifiableBezier: FunctionComponent<Props> = ({
  from,
  to,
  modifiers,
  color,
  closed,
  ...rest
}) => {
  const startPoint = modifiers ? applyModifiers(from, modifiers) : from;

  const modifiedBezierTailsPoints: Coord[][] = modifiers
    ? to.map((bezierEndPoint) =>
        bezierEndPoint.map((point) => applyModifiers(point, modifiers))
      )
    : to;

  const bezierLines: BezierLine[] = [];

  const firstLine = buildBezierLine(startPoint, modifiedBezierTailsPoints[0]);

  const otherLines = modifiedBezierTailsPoints
    .slice(1)
    .map((currentTailPoints, i) => {
      const prevLinePoints = modifiedBezierTailsPoints[i];
      const prevEndPoint = prevLinePoints[prevLinePoints.length - 1];

      return buildBezierLine(prevEndPoint, currentTailPoints);
    });

  bezierLines.push(firstLine, ...otherLines);

  if (closed) {
    const prevTailPoints =
      modifiedBezierTailsPoints[modifiedBezierTailsPoints.length - 1];
    const prevEndPoint = prevTailPoints[prevTailPoints.length - 1];

    bezierLines.push(buildBezierLine(prevEndPoint, [startPoint]));
  }

  return (
    <>
      {bezierLines.map((line) => (
        <Line
          x={line.start.x}
          y={line.start.y}
          points={line.tail}
          stroke={color || 'black'}
          bezier
          {...rest}
        />
      ))}
    </>
  );
};

export default ModifiableBezier;
