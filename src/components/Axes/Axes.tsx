import React, { FunctionComponent } from 'react';
import { Arrow, Text } from 'react-konva';

interface Props {
  width: number;
  height: number;
}

const Axes: FunctionComponent<Props> = ({ width, height }: Props) => {
  const getArrow = (
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number
  ) => (
    <Arrow
      x={xStart}
      y={yStart}
      points={[0, 0, xEnd, yEnd]}
      stroke="black"
      strokeWidth={0.5}
      pointerLength={15}
      pointerWidth={8}
      fill="grey"
    />
  );

  const getText = (axeName: string, x: number, y: number) => (
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
      {getText('x', width - 13, height / 2 - 14)}
      {getArrow(0, height / 2, width - 15, 0)}
      {getText('y', width / 2 - 6, -5)}
      {getArrow(width / 2, height, 0, -height + 23)}
    </>
  );
};

export default Axes;
