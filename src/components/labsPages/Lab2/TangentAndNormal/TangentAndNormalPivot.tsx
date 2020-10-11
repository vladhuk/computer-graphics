import React, { FunctionComponent } from 'react';
import PointModifier from '../../../../types/PointModifier';
import ModifiableCircle from '../../../modifiableKonvaShapes/ModifiableCircle';
import DescartesFolium from '../DescartesFolium';

interface Props {
  x0: number;
  descartesFolium: DescartesFolium;
  invert?: boolean;
  modifiers?: PointModifier[];
  color?: string;
}

const TangentAndNormalPivot: FunctionComponent<Props> = ({
  x0,
  descartesFolium,
  invert,
  modifiers,
  color,
}) => {
  const scale = invert ? -1 : 1;

  return (
    <ModifiableCircle
      position={{ x: x0, y: descartesFolium.calculateY(x0) * scale }}
      modifiers={modifiers}
      radius={5}
      fill={color}
    />
  );
};

export default TangentAndNormalPivot;
