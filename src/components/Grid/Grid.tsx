import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import ModifiableLine from '../modifiableKonvaShapes/ModifiableLine';

interface Props {
  maxCoord: Coord;
  cellLength: number;
  modifiers?: PointModifier[];
}

const Grid: FunctionComponent<Props> = ({
  maxCoord,
  cellLength,
  modifiers,
}) => {
  const getGridLine = (start: Coord): JSX.Element => {
    const end: Coord = {
      x: start.x === -maxCoord.x ? maxCoord.x : start.x,
      y: start.y === -maxCoord.y ? maxCoord.y : start.y,
    };

    return (
      <ModifiableLine
        key={`${start.x}_${start.y}`}
        from={start}
        to={[end]}
        modifiers={modifiers}
        strokeWidth={0.3}
      />
    );
  };

  const lines = [];

  lines.push(getGridLine({ x: -maxCoord.x, y: 0 }));
  lines.push(getGridLine({ x: 0, y: -maxCoord.y }));
  for (let startY = cellLength; startY < maxCoord.y; startY += cellLength) {
    lines.push(getGridLine({ x: -maxCoord.x, y: startY }));
    lines.push(getGridLine({ x: -maxCoord.x, y: -startY }));
  }
  for (let startX = cellLength; startX < maxCoord.x; startX += cellLength) {
    lines.push(getGridLine({ x: startX, y: -maxCoord.y }));
    lines.push(getGridLine({ x: -startX, y: -maxCoord.y }));
  }

  return <>{lines}</>;
};

export default Grid;
