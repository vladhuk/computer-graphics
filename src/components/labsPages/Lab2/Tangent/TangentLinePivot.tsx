import React, { FunctionComponent } from 'react';
import PointModifier from '../../../../types/PointModifier';
import ModifiableCircle from '../../../modifiableKonvaShapes/ModifiableCircle';
import DescartesFolium from '../DescartesFolium';

interface Props {
  x: number;
  descartesFolium: DescartesFolium;
  invert?: boolean;
  modifiers?: PointModifier[];
  color?: string;
}

const TangentLinePivot: FunctionComponent<Props> = ({
  x,
  descartesFolium,
  invert,
  modifiers,
  color,
}) => {
  const scale = invert ? -1 : 1;

  return (
    <ModifiableCircle
      position={{ x, y: descartesFolium.calculateY(x) * scale }}
      modifiers={modifiers}
      radius={5}
      fill={color}
    />
  );
};

export default TangentLinePivot;
