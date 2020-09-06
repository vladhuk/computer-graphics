import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';
import Coord from '../../types/Coord';

interface Props {
  width: number;
  height: number;
  spacing: number;
}

const Grid: FunctionComponent<Props> = ({ width, height, spacing }) => {
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

  for (let startY = spacing; startY < width; startY += spacing) {
    lines.push(getLine({ x: 0, y: startY }, { x: width, y: 0 }));
  }
  for (let startX = spacing; startX < height; startX += spacing) {
    lines.push(getLine({ x: startX, y: 0 }, { x: 0, y: height }));
  }

  return <>{lines}</>;
};

export default Grid;
