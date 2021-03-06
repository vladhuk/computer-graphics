import React, { FunctionComponent } from 'react';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import ModifiableArrow from '../modifiableKonvaShapes/ModifiableArrow';
import ModifiableText from '../modifiableKonvaShapes/ModifiableText';

interface Props {
  maxCoord: Coord;
  modifiers?: PointModifier[];
}

const Axes: FunctionComponent<Props> = ({ maxCoord, modifiers }) => {
  const getArrow = (start: Coord, end: Coord) => (
    <ModifiableArrow
      from={start}
      to={end}
      modifiers={modifiers}
      strokeWidth={0.9}
      pointerLength={15}
      pointerWidth={8}
      color="grey"
    />
  );

  const getText = (axeName: string, position: Coord) => (
    <ModifiableText
      position={position}
      modifiers={modifiers}
      text={axeName}
      fontFamily="sans-serif"
      fontSize={25}
      color="grey"
    />
  );

  return (
    <>
      {getText('x', { x: maxCoord.x - 13, y: 0 })}
      {getArrow({ x: -maxCoord.x, y: 0 }, { x: maxCoord.x - 15, y: 0 })}
      {getText('y', { x: 2, y: maxCoord.y })}
      {getArrow({ x: 0, y: -maxCoord.y }, { x: 0, y: maxCoord.y - 23 })}
    </>
  );
};

export default Axes;
