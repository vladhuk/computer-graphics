import React, { FunctionComponent } from 'react';
import PointModifier from '../../../types/PointModifier';
import ModifiableLinePicture from '../../modifiableKonvaShapes/ModifiableLinePicture';
import Shape from './Shape';
import ModifiableLine from '../../modifiableKonvaShapes/ModifiableLine';

interface Props {
  shape: Shape;
  modifiers?: PointModifier[];
}

const Picture: FunctionComponent<Props> = ({ shape, modifiers }) => (
  <>
    <ModifiableLine
      points={shape.getOuterShapePoints()}
      modifiers={modifiers}
      closed
    />
    <ModifiableLinePicture
      lines={shape.getInnerShapeLines()}
      modifiers={modifiers}
    />
  </>
);

export default Picture;
