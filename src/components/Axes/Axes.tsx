import React, { FunctionComponent } from 'react';
import { Arrow, Text } from 'react-konva';
import Coord from '../../types/Coord';

interface Props {
  width: number;
  height: number;
}

const Axes: FunctionComponent<Props> = ({ width, height }: Props) => {
  const getArrow = (start: Coord, end: Coord) => (
    <Arrow
      x={start.x}
      y={start.y}
      points={[0, 0, end.x, end.y]}
      stroke="black"
      strokeWidth={0.5}
      pointerLength={15}
      pointerWidth={8}
      fill="grey"
    />
  );

  const getText = (axeName: string, { x, y }: Coord) => (
    <Text
      text={axeName}
      x={x}
      y={y}
      fontFamily="sans-serif"
      fontSize={25}
      fill="grey"
    />
  );

  return (
    <>
      {getText('x', { x: width - 13, y: height / 2 - 14 })}
      {getArrow({ x: 0, y: height / 2 }, { x: width - 15, y: 0 })}
      {getText('y', { x: width / 2 - 6, y: -5 })}
      {getArrow({ x: width / 2, y: height }, { x: 0, y: -height + 23 })}
    </>
  );
};

export default Axes;
