import React, { FunctionComponent, useState } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { ModifiableBezier } from '../../../modifiableKonvaShapes';
import SupportingLines from './SupportingLines';
import SupportingPoints from './SupportingPoints';

interface Props {
  picturePoints: Coord[][];
  modifiers?: PointModifier[];
  dndModifiers?: PointModifier[];
  isEnabledDragging?: boolean;
  isEnabledSupportingLines?: boolean;
}

const Picture: FunctionComponent<Props> = ({
  picturePoints,
  modifiers,
  dndModifiers,
  isEnabledDragging,
  isEnabledSupportingLines,
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
      {isEnabledSupportingLines && (
        <>
          <SupportingLines
            points={points}
            strokeWidth={1.2}
            modifiers={modifiers}
          />
          <SupportingPoints
            pointsRadius={5}
            points={points}
            isEnabledDragging={isEnabledDragging}
            dndModifiers={dndModifiers}
            modifiers={modifiers}
            setPoints={setPoints}
          />
        </>
      )}
    </>
  );
};

export default Picture;
