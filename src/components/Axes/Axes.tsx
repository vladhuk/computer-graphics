import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import { ModifiableArrow, ModifiableText } from '../modifiableKonvaShapes';

interface Props {
  width: number;
  height: number;
  center: Coord;
  modifiers?: PointModifier[];
}

const Axes: FunctionComponent<Props> = ({
  width,
  height,
  center,
  modifiers,
}) => {
  const getArrow = (start: Coord, end: Coord) => (
    <ModifiableArrow
      from={start}
      to={end}
      modifiers={modifiers}
      strokeWidth={0.6}
      pointerLength={15}
      pointerWidth={8}
      fill="grey"
    />
  );

  const getText = (axeName: string, position: Coord) => (
    <ModifiableText
      position={position}
      modifiers={modifiers}
      text={axeName}
      fontFamily="sans-serif"
      fontSize={25}
      fill="grey"
    />
  );

  return (
    <>
      {getText('x', { x: width - 13, y: center.y })}
      {getArrow({ x: 0, y: center.y }, { x: width - 15, y: center.y })}
      {getText('y', { x: center.x, y: -5 })}
      {getArrow({ x: center.x, y: height }, { x: center.x, y: 23 })}
    </>
  );
};

export default Axes;
