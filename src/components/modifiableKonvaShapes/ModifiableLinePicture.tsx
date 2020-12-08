import React, { FunctionComponent } from 'react';
import { ModifiableLinearShape } from '../../types/ModifiableShape';
import ModifiableLine, { Line } from './ModifiableLine';

interface Props extends ModifiableLinearShape {
  lines: Line[];
}

const ModifiableLinePicture: FunctionComponent<Props> = ({
  lines,
  ...rest
}) => (
  <>
    {lines.map(({ from, to }) => (
      <ModifiableLine {...rest} from={from} to={to} />
    ))}
  </>
);

export default ModifiableLinePicture;
