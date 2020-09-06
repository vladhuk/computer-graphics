import React, { FunctionComponent } from 'react';
import GridLine from './GridLine';

interface Props {
  width: number;
  height: number;
  cellLength: number;
}

const Grid: FunctionComponent<Props> = ({ width, height, cellLength }) => {
  const lines = [];

  for (let startY = cellLength; startY < width; startY += cellLength) {
    lines.push(
      <GridLine
        key={`0_${startY}`}
        start={{ x: 0, y: startY }}
        end={{ x: width, y: 0 }}
      />
    );
  }
  for (let startX = cellLength; startX < height; startX += cellLength) {
    lines.push(
      <GridLine
        key={`${startX}_0`}
        start={{ x: startX, y: 0 }}
        end={{ x: 0, y: height }}
      />
    );
  }

  return <>{lines}</>;
};

export default Grid;
