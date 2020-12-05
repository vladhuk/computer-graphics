import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import ModifiableLine from '../../modifiableKonvaShapes/ModifiableLine';
import DescartesFolium from './DescartesFolium';

interface Props {
  maxCoord: Coord;
  descartesFolium: DescartesFolium;
  color?: string;
  modifiers?: PointModifier[];
}

const Asymptote: FunctionComponent<Props> = ({
  maxCoord,
  descartesFolium,
  color,
  modifiers,
}) => {
  const scale = 2;

  return (
    <ModifiableLine
      from={{
        x: -maxCoord.x * scale,
        y: descartesFolium.getAsymtoteSecondCoordParam(-maxCoord.x * scale),
      }}
      to={[
        {
          x: descartesFolium.getAsymtoteSecondCoordParam(-maxCoord.y * scale),
          y: -maxCoord.y * scale,
        },
      ]}
      color={color}
      modifiers={modifiers}
      strokeWidth={1}
    />
  );
};

export default Asymptote;
