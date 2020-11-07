import { flatten } from 'lodash';
import React, { FunctionComponent, useState } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import {
  ModifiableBezier,
  ModifiableCircle,
  ModifiableLine,
} from '../../modifiableKonvaShapes';
import ModifiableDndOptions from '../../modifiableKonvaShapes/ModifiableDndOptions';

interface Props {
  picturePoints: Coord[][];
  modifiers?: PointModifier[];
  dndModifiers?: PointModifier[];
  isEnabledDragging?: boolean;
}

const Picture: FunctionComponent<Props> = ({
  picturePoints,
  modifiers,
  dndModifiers,
  isEnabledDragging,
}) => {
  const [points, setPoints] = useState(picturePoints);

  const from = points[points.length - 1][1];

  return (
    <>
      <ModifiableBezier
        from={from}
        to={points}
        modifiers={modifiers}
        color="black"
      />
      <ModifiableLine
        from={from}
        to={flatten(points)}
        modifiers={modifiers}
        color="hotpink"
        strokeWidth={1.2}
      />
      <ModifiableLine
        from={from}
        to={[...points.map((pointsPair) => pointsPair[1])]}
        modifiers={modifiers}
        color="skyblue"
        strokeWidth={1.2}
      />
      {points.map((pointsPair, pairIndex) =>
        pointsPair.map((point, pointIndex) => (
          <ModifiableCircle
            position={point}
            radius={5}
            color={pointIndex === 0 ? 'hotpink' : 'skyblue'}
            modifiers={modifiers}
            dndOptions={
              new ModifiableDndOptions({
                modifiers: dndModifiers,
                draggable: isEnabledDragging,
                onDragMove: (draggedPoint) => {
                  setPoints([
                    ...points.slice(0, pairIndex),
                    [
                      ...pointsPair.slice(0, pointIndex),
                      draggedPoint,
                      ...pointsPair.slice(pointIndex + 1),
                    ],
                    ...points.slice(pairIndex + 1),
                  ]);
                },
              })
            }
          />
        ))
      )}
    </>
  );
};

export default Picture;
