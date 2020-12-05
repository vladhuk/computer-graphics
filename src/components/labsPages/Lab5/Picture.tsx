import React, { FunctionComponent } from 'react';
import PointModifier from '../../../types/PointModifier';
import ModifiableLine, {
  Line,
} from '../../modifiableKonvaShapes/ModifiableLine';

interface Props {
  pictureLines: Line[];
  modifiers?: PointModifier[];
}

const Picture: FunctionComponent<Props> = ({ pictureLines, modifiers }) => (
  <>
    {pictureLines.map(({ from, to }) => (
      <ModifiableLine from={from} to={to} modifiers={modifiers} />
    ))}
  </>
);

export default Picture;
