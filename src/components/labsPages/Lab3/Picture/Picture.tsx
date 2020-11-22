import React, { FunctionComponent } from 'react';
import PointModifier from '../../../../types/PointModifier';
import { ModifiableBezier } from '../../../modifiableKonvaShapes';
import PicturePart from '../PicturePart';
import SupportingLines from './SupportingLines';
import SupportingPoints from './SupportingPoints';

interface Props {
  parts: PicturePart[];
  setParts(parts: PicturePart[]): void;
  modifiers?: PointModifier[];
  dndModifiers?: PointModifier[];
  isEnabledDragging?: boolean;
  isEnabledSupportingLines?: boolean;
}

const Picture: FunctionComponent<Props> = ({
  parts,
  setParts,
  modifiers,
  dndModifiers,
  isEnabledDragging,
  isEnabledSupportingLines,
}) => {
  const points = parts.map((part) => part.points);
  const from = points[parts.length - 1][1];

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
            parts={parts}
            isEnabledDragging={isEnabledDragging}
            dndModifiers={dndModifiers}
            modifiers={modifiers}
            setParts={setParts}
          />
        </>
      )}
    </>
  );
};

export default Picture;
