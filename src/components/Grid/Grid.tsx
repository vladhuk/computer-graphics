import React, { FunctionComponent } from 'react';
import { Line } from 'react-konva';

interface Props {
  width: number;
  height: number;
  spacing: number;
}

const Grid: FunctionComponent<Props> = ({ width, height, spacing }: Props) => {
  const getLine = (
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number
  ) => (
    <Line
      x={xStart}
      y={yStart}
      points={[0, 0, xEnd, yEnd]}
      stroke="black"
      strokeWidth={0.3}
    />
  );

  const lines = [];

  for (let i = spacing; i < width; i += spacing) {
    lines.push(getLine(0, i, width, 0));
  }
  for (let i = spacing; i < height; i += spacing) {
    lines.push(getLine(i, 0, 0, height));
  }

  return <>{lines}</>;
};

export default Grid;
