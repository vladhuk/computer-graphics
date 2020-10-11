import React, { FunctionComponent } from 'react';
import Coord from '../../../../types/Coord';
import PointModifier from '../../../../types/PointModifier';
import { ModifiableLine } from '../../../modifiableKonvaShapes';
import DescartesFolium from '../DescartesFolium';

interface Props {
  maxCoord: Coord;
  descartesFolium: DescartesFolium;
  x0: number;
  invert?: boolean;
  color?: string;
  modifiers?: PointModifier[];
}

const TangentLine: FunctionComponent<Props> = ({
  maxCoord,
  descartesFolium,
  x0,
  invert,
  modifiers,
  ...lineProps
}) => {
  const getTangentLineY = descartesFolium.bindGetTangentLineY(x0);
  const scale = invert ? -1 : 1;

  return (
    <ModifiableLine
      from={{
        x: -maxCoord.x,
        y: getTangentLineY(-maxCoord.x) * scale,
      }}
      to={[
        {
          x: maxCoord.x,
          y: getTangentLineY(maxCoord.x) * scale,
        },
      ]}
      modifiers={modifiers}
      {...lineProps}
    />
  );
};

export default TangentLine;
