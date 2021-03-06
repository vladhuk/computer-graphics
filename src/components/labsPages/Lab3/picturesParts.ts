import Coord from '../../../types/Coord';
import PicturePart from '../../../types/PicturePart';

type PicturePartTuple = [Coord, Coord, boolean?];

function normalizePicturePart(picturePart: PicturePartTuple): PicturePart {
  const points = normalizeCoords([picturePart[0], picturePart[1]]);
  return {
    points: [points[0], points[1]],
    isContinuous: picturePart[2],
  };
}

function normalizeCoords(pointsPair: Coord[]): Coord[] {
  return pointsPair.map((point) => ({
    x: point.x - 400,
    y: -point.y + 400,
  }));
}

/**
 * First point in the points pair is a bezier point for curve constructing.
 * Second point in the pair is a end point of curve.
 *
 * So the first point of every next line is an end point of previous pair
 * and we don't need to specify it.
 */
const sharkPointsTuples: PicturePartTuple[] = [
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
  [
    { x: 712, y: 312 },
    { x: 742, y: 217 },
  ],
  [
    { x: 747, y: 207 },
    { x: 751, y: 222 },
  ],
  [{ x: 745, y: 316 }, { x: 665, y: 420 }, true],
  [{ x: 610, y: 509 }, { x: 709, y: 563 }, true],
  [
    { x: 726, y: 577 },
    { x: 702, y: 581 },
  ],
  [
    { x: 672, y: 580 },
    { x: 627, y: 526 },
  ],
  [
    { x: 590, y: 457 },
    { x: 582, y: 443 },
  ],
  [
    { x: 555, y: 440 },
    { x: 523, y: 458 },
  ],
  [
    { x: 540, y: 535 },
    { x: 484, y: 466 },
  ],
  [
    { x: 439, y: 466 },
    { x: 379, y: 484 },
  ],
  [
    { x: 480, y: 870 },
    { x: 298, y: 510 },
  ],
];

const swanPointsTuples: PicturePartTuple[] = [
  [
    { x: 95, y: 578 },
    { x: 105, y: 549 },
  ],
  [
    { x: 70, y: 530 },
    { x: 76, y: 499 },
  ],
  [
    { x: 64, y: 481 },
    { x: 71, y: 461 },
  ],
  [
    { x: 104, y: 490 },
    { x: 146, y: 492 },
  ],
  [
    { x: 139, y: 484 },
    { x: 139, y: 484 },
  ],
  [{ x: 150, y: 495 }, { x: 279, y: 427 }, true],
  [{ x: 432, y: 337 }, { x: 550, y: 391 }, true],
  [
    { x: 500, y: 325 },
    { x: 529, y: 178 },
  ],
  [
    { x: 555, y: 150 },
    { x: 626, y: 186 },
  ],
  [
    { x: 636, y: 174 },
    { x: 640, y: 208 },
  ],
  [
    { x: 700, y: 250 },
    { x: 675, y: 250 },
  ],
  [
    { x: 612, y: 230 },
    { x: 575, y: 239 },
  ],
  [
    { x: 550, y: 360 },
    { x: 695, y: 438 },
  ],
  [
    { x: 780, y: 520 },
    { x: 692, y: 578 },
  ],
  [
    { x: 692, y: 596 },
    { x: 664, y: 609 },
  ],
  [
    { x: 654, y: 605 },
    { x: 657, y: 593 },
  ],
  [
    { x: 621, y: 629 },
    { x: 609, y: 611 },
  ],
  [
    { x: 546, y: 655 },
    { x: 514, y: 629 },
  ],
  [
    { x: 476, y: 670 },
    { x: 429, y: 641 },
  ],
  [
    { x: 408, y: 664 },
    { x: 387, y: 641 },
  ],
  [
    { x: 345, y: 664 },
    { x: 312, y: 634 },
  ],
  [
    { x: 281, y: 663 },
    { x: 236, y: 617 },
  ],
  [
    { x: 206, y: 626 },
    { x: 183, y: 614 },
  ],
  [
    { x: 160, y: 622 },
    { x: 155, y: 602 },
  ],
  [
    { x: 150, y: 590 },
    { x: 132, y: 589 },
  ],
];

export const [sharkParts, swanParts] = [
  sharkPointsTuples,
  swanPointsTuples,
].map((tuples) => tuples.map(normalizePicturePart));
