import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import { ModifiableLine } from '../modifiableKonvaShapes';

interface Props {
  center: Coord;
  cellLength: number;
  modifiers?: PointModifier[];
}

const Grid: FunctionComponent<Props> = ({ center, cellLength, modifiers }) => {
  const getGridLine = (start: Coord): JSX.Element => {
    const end: Coord = {
      x: start.x === -center.x ? center.x : start.x,
      y: start.y === -center.y ? center.y : start.y,
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

  lines.push(getGridLine({ x: -center.x, y: 0 }));
  lines.push(getGridLine({ x: 0, y: -center.y }));
  for (let startY = cellLength; startY < center.y; startY += cellLength) {
    lines.push(getGridLine({ x: -center.x, y: startY }));
    lines.push(getGridLine({ x: -center.x, y: -startY }));
  }
  for (let startX = cellLength; startX < center.x; startX += cellLength) {
    lines.push(getGridLine({ x: startX, y: -center.y }));
    lines.push(getGridLine({ x: -startX, y: -center.y }));
  }

  return <>{lines}</>;
};

export default Grid;
