import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import GridLine from './GridLine';

interface Props {
  width: number;
  height: number;
  center: Coord;
  cellLength: number;
}

const Grid: FunctionComponent<Props> = ({
  width,
  height,
  center,
  cellLength,
}) => {
  const getGridLine = (start: Coord): JSX.Element => {
    const end: Coord = {
      x: start.x ? 0 : width,
      y: start.y ? 0 : height,
    };

    return <GridLine key={`${start.x}_${start.y}`} start={start} end={end} />;
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
