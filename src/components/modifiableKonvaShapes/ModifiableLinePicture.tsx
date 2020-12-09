import React, { FunctionComponent } from 'react';
import Line from '../../types/Line';
import { ModifiableLinearShape } from '../../types/ModifiableShape';
import ModifiableLine from './ModifiableLine';

interface Props extends ModifiableLinearShape {
  lines: Line[];
}

const ModifiableLinePicture: FunctionComponent<Props> = ({
  lines,
  ...rest
}) => (
  <>
    {lines.map((line) => (
      <ModifiableLine {...rest} points={line} />
    ))}
  </>
);

export default ModifiableLinePicture;
