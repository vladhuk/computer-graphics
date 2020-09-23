import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import CoordLine from '../CoordLine';

interface Props {
  width: number;
  height: number;
  center: Coord;
  cellLength: number;
  modifiers?: PointModifier[];
}

const Grid: FunctionComponent<Props> = ({
  width,
  height,
  center,
  cellLength,
  modifiers,
}) => {
  const getGridLine = (start: Coord): JSX.Element => {
    const end: Coord = {
      x: start.x || width,
      y: start.y || height,
    };

    return (
      <CoordLine
        key={`${start.x}_${start.y}`}
        from={start}
        to={[end]}
        modifiers={modifiers}
        strokeWidth={0.3}
      />
    );
  };

  const lines = [];

  lines.push(getGridLine({ x: 0, y: center.y }));
  lines.push(getGridLine({ x: center.x, y: 0 }));
  for (
    let startY = center.y + cellLength;
    startY < width;
    startY += cellLength
  ) {
    lines.push(getGridLine({ x: 0, y: startY }));
    lines.push(getGridLine({ x: 0, y: height - startY }));
  }
  for (
    let startX = center.x + cellLength;
    startX < height;
    startX += cellLength
  ) {
    lines.push(getGridLine({ x: startX, y: 0 }));
    lines.push(getGridLine({ x: width - startX, y: 0 }));
  }

  return <>{lines}</>;
};

export default Grid;
