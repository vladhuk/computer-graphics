import React, { FunctionComponent } from 'react';
import PointModifier from '../../../types/PointModifier';
import ModifiableCircle from '../../modifiableKonvaShapes/ModifiableCircle';
import DescartesFolium from './DescartesFolium';

interface Props {
  x: number;
  descartesFolium: DescartesFolium;
  invert?: boolean;
  modifiers?: PointModifier[];
  color?: string;
}

const TangentAndNormalPivot: FunctionComponent<Props> = ({
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
      radius={5}
      modifiers={modifiers}
      fill={color}
    />
  );
};

export default TangentAndNormalPivot;
