import React, { FunctionComponent, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Grid from '../Grid';
import './App.css';
import Axes from '../Axes';
import exampleImage from '../../assets/examples/example1.png';
import DimensionsInputs from '../DimensionsForm';
import Shape from '../Shape';
import Coord from '../../types/Coord';
import Pivot from '../Pivot';
import {
  bindOffsetPoint,
  bindRotatePoint,
  bindAffinePoint,
} from '../../util/grapchicFunctions';
import PointModifier from '../../types/PointModifier';

const App: FunctionComponent = () => {
  const width = 800;
  const height = 800;

  const center: Coord = { x: width / 2, y: height / 2 };

  const [cellLength, setCellLength] = useState(25);
  const [step, setStep] = useState(5);
  const [R, setR] = useState(75);
  const [L1, setL1] = useState(300);
  const [L2, setL2] = useState(75);
  const [L3, setL3] = useState(300);
  const [L4, setL4] = useState(450);
  const [offset, setOffset] = useState<Coord>({ x: 0, y: 0 });
  const [rotate, setRotate] = useState(0);
  const [pivot, setPivot] = useState<Coord>(center);
  const [affine0, setAffine0] = useState<Coord>({ x: 0, y: 0 });
  const [affineX, setAffineX] = useState<Coord>({ x: 1, y: 0 });
  const [affineY, setAffineY] = useState<Coord>({ x: 0, y: 1 });

  const affinePoint = bindAffinePoint(affine0, affineX, affineY, center);

  const gridModifiers: PointModifier[] = [affinePoint];
  const shapeModifiers: PointModifier[] = [
    bindOffsetPoint(offset),
    bindRotatePoint(rotate, pivot),
    ...gridModifiers,
  ];

  return (
    <div className="d-flex justify-content-between my-3 mx-5">
      <DimensionsInputs
        tabs={[
          {
            title: 'Parameters',
            inputsGroups: [
              [
                {
                  title: 'Cell length',
                  value: cellLength,
                  min: 1,
                  setValue: setCellLength,
                },
                {
                  title: 'Input step',
                  value: step,
                  min: 1,
                  setValue: setStep,
                },
              ],
              [
                { title: 'R', value: R, min: 0, step, setValue: setR },
                { title: 'L1', value: L1, min: 0, step, setValue: setL1 },
                { title: 'L2', value: L2, min: 0, step, setValue: setL2 },
                { title: 'L3', value: L3, min: 0, step, setValue: setL3 },
                { title: 'L4', value: L4, min: 0, step, setValue: setL4 },
              ],
            ],
          },
          {
            title: 'Euclid',
            inputsGroups: [
              [
                {
                  title: 'ΔX',
                  value: offset.x,
                  step,
                  setValue: (value) => setOffset({ x: value, y: offset.y }),
                },
                {
                  title: 'ΔY',
                  value: -offset.y,
                  step,
                  setValue: (value) => setOffset({ x: offset.x, y: -value }),
                },
              ],
              [
                {
                  title: 'Rotate',
                  value: rotate,
                  step,
                  unit: 'deg',
                  setValue: setRotate,
                },
                {
                  title: 'Pivot X',
                  value: pivot.x - center.x,
                  step,
                  setValue: (value) =>
                    setPivot({ x: value + center.x, y: pivot.y }),
                },
                {
                  title: 'Pivot Y',
                  value: -pivot.y + center.y,
                  step,
                  setValue: (value) =>
                    setPivot({ x: pivot.x, y: -value + center.y }),
                },
              ],
            ],
          },
          {
            title: 'Affine',
            inputsGroups: [
              [
                {
                  title: `0x`,
                  value: affine0.x,
                  step,
                  setValue: (value) => setAffine0({ x: value, y: affine0.y }),
                },
                {
                  title: `0y`,
                  value: affine0.y,
                  step,
                  setValue: (value) => setAffine0({ x: affine0.x, y: value }),
                },
              ],
              [
                {
                  title: `Xx`,
                  value: affineX.x,
                  step: 0.1,
                  unit: ' ',
                  setValue: (value) => setAffineX({ x: value, y: affineX.y }),
                },
                {
                  title: `Xy`,
                  value: affineX.y,
                  step: 0.1,
                  unit: ' ',
                  setValue: (value) => setAffineX({ x: affineX.x, y: value }),
                },
              ],
              [
                {
                  title: `Yx`,
                  value: affineY.x,
                  step: 0.1,
                  unit: ' ',
                  setValue: (value) => setAffineY({ x: value, y: affineY.y }),
                },
                {
                  title: `Yy`,
                  value: affineY.y,
                  step: 0.1,
                  unit: ' ',
                  setValue: (value) => setAffineY({ x: affineY.x, y: value }),
                },
              ],
            ],
          },
        ]}
      />
      <Stage width={width} height={height}>
        <Layer>
          <Grid
            width={width}
            height={height}
            center={center}
            cellLength={cellLength}
            modifiers={gridModifiers}
          />
          <Axes
            width={width}
            height={height}
            center={center}
            modifiers={gridModifiers}
          />
          <Pivot pivot={affinePoint(pivot)} />
          <Shape
            center={center}
            R={R}
            L1={L1}
            L2={L2}
            L3={L3}
            L4={L4}
            modifiers={shapeModifiers}
          />
        </Layer>
      </Stage>
      <img src={exampleImage} alt="example" style={{ height }} />
    </div>
  );
};

export default App;
