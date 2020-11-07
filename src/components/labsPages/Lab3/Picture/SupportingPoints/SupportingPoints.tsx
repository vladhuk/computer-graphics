import React, { FunctionComponent } from 'react';
import Coord from '../../../../../types/Coord';
import PointModifier from '../../../../../types/PointModifier';
import { ModifiableCircle } from '../../../../modifiableKonvaShapes';
import ModifiableDndOptions from '../../../../modifiableKonvaShapes/ModifiableDndOptions';
import { onPointMove } from './SupportingPoints.service';

interface Props {
  points: Coord[][];
  pointsRadius: number;
  isEnabledDragging?: boolean;
  dndModifiers?: PointModifier[];
  modifiers?: PointModifier[];
  setPoints?: (points: Coord[][]) => void;
}

const SupportingPoints: FunctionComponent<Props> = ({
  points,
  pointsRadius,
  isEnabledDragging,
  dndModifiers,
  modifiers,
  setPoints,
}) => {
  const buildDndOptions = (
    pointsPair: Coord[],
    pairIndex: number,
    pointIndex: number
  ): ModifiableDndOptions =>
    new ModifiableDndOptions({
      modifiers: dndModifiers,
      draggable: isEnabledDragging,
      onDragMove: (draggedPoint) =>
        onPointMove({
          points,
          setPoints,
          draggedPoint,
          pointIndex,
          pointsPair,
          pairIndex,
        }),
    });

  return (
    <>
      {points.map((pointsPair, pairIndex) =>
        pointsPair.map((point, pointIndex) => (
          <ModifiableCircle
            position={point}
            radius={pointsRadius}
            color={pointIndex === 0 ? 'hotpink' : 'skyblue'}
            modifiers={modifiers}
            dndOptions={buildDndOptions(pointsPair, pairIndex, pointIndex)}
          />
        ))
      )}
    </>
  );
};

export default SupportingPoints;
