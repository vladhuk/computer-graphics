import React, { FunctionComponent } from 'react';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import ModifiableBezier from '../../modifiableKonvaShapes/ModifiableBezier';

interface Props {
  modifiers?: PointModifier[];
}

const points: Coord[][] = [
  [{ x: 298, y: 510 }],
  [
    { x: 179, y: 500 },
    { x: 113, y: 470 },
  ],
  [
    { x: 68, y: 449 },
    { x: 52, y: 421 },
  ],
  [
    { x: 44, y: 404 },
    { x: 49, y: 390 },
  ],
  [
    { x: 72, y: 343 },
    { x: 125, y: 322 },
  ],
  [
    { x: 164, y: 304 },
    { x: 206, y: 306 },
  ],
  [
    { x: 198, y: 277 },
    { x: 189, y: 257 },
  ],
  [
    { x: 102, y: 0 },
    { x: 258, y: 237 },
  ],
  [
    { x: 268, y: 251 },
    { x: 283, y: 277 },
  ],
  [
    { x: 298, y: 260 },
    { x: 310, y: 252 },
  ],
  [
    { x: 409, y: 163 },
    { x: 464, y: 164 },
  ],
  [
    { x: 485, y: 164 },
    { x: 478, y: 183 },
  ],
  [
    { x: 441, y: 228 },
    { x: 425, y: 327 },
  ],
  [
    { x: 440, y: 332 },
    { x: 454, y: 336 },
  ],
  [
    { x: 500, y: 268 },
    { x: 532, y: 275 },
  ],
  [
    { x: 543, y: 282 },
    { x: 538, y: 294 },
  ],
  [
    { x: 519, y: 318 },
    { x: 513, y: 365 },
  ],
  [
    { x: 543, y: 375 },
    { x: 573, y: 380 },
  ],
].map((bezier) =>
  bezier.map((point) => ({
    x: point.x - 400,
    y: -point.y + 400,
  }))
);

const Picture: FunctionComponent<Props> = ({ modifiers }) => (
  <>
    <ModifiableBezier
      from={points[0][0]}
      to={points.slice(1)}
      modifiers={modifiers}
      color="black"
    />
  </>
);

export default Picture;
