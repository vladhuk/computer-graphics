import { flatten } from 'lodash';
import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import ModifiableLine from '../../../modifiableKonvaShapes/ModifiableLine';

interface Props {
  points: Coord[][];
  strokeWidth?: number;
  modifiers?: PointModifier[];
}

const SupportingLines: FunctionComponent<Props> = ({
  points,
  strokeWidth,
  modifiers,
}) => {
  const from = points[points.length - 1][1];

  return (
    <>
      <ModifiableLine
        from={from}
        to={flatten(points)}
        modifiers={modifiers}
        color="hotpink"
        strokeWidth={strokeWidth}
      />
      <ModifiableLine
        from={from}
        to={[...points.map((pointsPair) => pointsPair[1])]}
        modifiers={modifiers}
        color="skyblue"
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export default SupportingLines;
