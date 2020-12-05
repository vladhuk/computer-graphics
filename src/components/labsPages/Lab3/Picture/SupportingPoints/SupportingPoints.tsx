import React, { FunctionComponent } from 'react';
import PicturePart from '../../../../../types/PicturePart';
import PointModifier from '../../../../../types/PointModifier';
import ModifiableCircle from '../../../../modifiableKonvaShapes/ModifiableCircle';
import ModifiableDndOptions from '../../../../modifiableKonvaShapes/ModifiableDndOptions';
import { getPointColor, onPointMove } from './SupportingPoints.service';

interface Props {
  parts: PicturePart[];
  pointsRadius: number;
  isEnabledDragging?: boolean;
  dndModifiers?: PointModifier[];
  modifiers?: PointModifier[];
  setParts?: (parts: PicturePart[]) => void;
}

const SupportingPoints: FunctionComponent<Props> = ({
  parts,
  pointsRadius,
  isEnabledDragging,
  dndModifiers,
  modifiers,
  setParts,
}) => {
  const buildDndOptions = (
    part: PicturePart,
    partIndex: number,
    pointIndex: number
  ): ModifiableDndOptions =>
    new ModifiableDndOptions({
      modifiers: dndModifiers,
      draggable: isEnabledDragging,
      onDragMove: (draggedPoint) =>
        onPointMove({
          parts,
          setParts,
          draggedPoint,
          pointIndex,
          part,
          partIndex,
        }),
    });

  return (
    <>
      {parts.map((part, partIndex) =>
        part.points.map((point, pointIndex) => (
          <ModifiableCircle
            position={point}
            radius={pointsRadius}
            color={getPointColor(pointIndex, !!part.isContinuous)}
            modifiers={modifiers}
            dndOptions={buildDndOptions(part, partIndex, pointIndex)}
          />
        ))
      )}
    </>
  );
};

export default SupportingPoints;
