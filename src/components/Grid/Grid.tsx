import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';

interface Props {
  width: number;
  height: number;
  cellLength: number;
}

const Grid: FunctionComponent<Props> = ({ width, height, cellLength }) => {
  const getLine = (start: Coord, end: Coord) => (
    <Line
      x={start.x}
      y={start.y}
      points={[0, 0, end.x, end.y]}
      stroke="black"
      strokeWidth={0.3}
    />
  );

  const lines = [];

  for (let startY = cellLength; startY < width; startY += cellLength) {
    lines.push(getLine({ x: 0, y: startY }, { x: width, y: 0 }));
  }
  for (let startX = cellLength; startX < height; startX += cellLength) {
    lines.push(getLine({ x: startX, y: 0 }, { x: 0, y: height }));
  }

  return <>{lines}</>;
};

export default Grid;
