import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { Col } from 'react-bootstrap';
import Grid from '../Grid';
import './App.css';
import Axes from '../Axes';
import exampleImage from '../../assets/examples/example1.png';
import DimensionsInputs, { FormTab } from '../DimensionsForm';
import Shape from '../Shape';
import Coord from '../../types/Coord';
import {
  bindOffsetPoint,
  bindAffinePointWithOffset,
  bindProjectivePointWithOffset,
  bindRotatePointByDegreesWithPivot,
} from '../../util/grapchicFunctions';
import PointModifier from '../../types/PointModifier';
import Affine from '../../types/Affine';
import Projective from '../../types/Projective';
import ModifiableCircle from '../modifiableKonvaShapes/ModifiableCircle';

const width = 800;
const height = 800;
const center: Coord = { x: width / 2, y: height / 2 };

const App: FunctionComponent = () => {
  const [currentTabName, setCurrentTabName] = useState<string | null>();
  const [cellLength, setCellLength] = useState(25);
  const [step, setStep] = useState(5);
  const [R, setR] = useState(75);
  const [L1, setL1] = useState(300);
  const [L2, setL2] = useState(75);
  const [L3, setL3] = useState(300);
  const [L4, setL4] = useState(450);
  const [offset, setOffset] = useState<Coord>({ x: 0, y: 0 });
  const [rotateDegrees, setRotateDegrees] = useState(0);
  const [pivot, setPivot] = useState<Coord>(center);
  const [affine, setAffine] = useState<Affine>({
    r0: { x: 0, y: 0 },
    rX: { x: center.x, y: 0 },
    rY: { x: 0, y: center.y },
  });
  const normalizedAffine = useMemo<Affine>(
    () => ({
      ...affine,
      rX: { x: affine.rX.x / center.x, y: affine.rX.y / center.y },
      rY: { x: affine.rY.x / center.x, y: affine.rY.y / center.y },
    }),
    [affine]
  );
  const [projective, setProjective] = useState<Projective>({
    r0: { x: 0, y: 0 },
    rX: { x: 800, y: 0 },
    rY: { x: 0, y: 800 },
    w0: 800,
    w: { x: 400, y: 400 },
  });
  const normalizedProjective = useMemo<Projective>(
    () => ({
      ...projective,
      w: { x: projective.w.x / center.x, y: projective.w.y / center.y },
    }),
    [projective]
  );
  const normalizedProjectiveForAxes = useMemo<Affine>(
    () => ({
      ...projective,
      rX: { x: projective.rX.x / center.x, y: projective.rX.y / center.y },
      rY: { x: projective.rY.x / center.x, y: projective.rY.y / center.y },
    }),
    [projective]
  );

  const defaultAxesModifiers = useMemo<PointModifier[]>(
    () => [bindAffinePointWithOffset(normalizedAffine, center)],
    [normalizedAffine]
  );
  const [axesModifiers, setAxesModifiers] = useState<PointModifier[]>(
    defaultAxesModifiers
  );
  const [gridModifiers, setGridModifiers] = useState<PointModifier[]>(
    defaultAxesModifiers
  );
  const shapeModifiers = useMemo<PointModifier[]>(
    () => [
      bindOffsetPoint(offset),
      bindRotatePointByDegreesWithPivot(rotateDegrees, pivot),
      ...gridModifiers,
    ],
    [gridModifiers, offset, pivot, rotateDegrees]
  );

  const tabs: Record<string, FormTab> = {
    parameters: {
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
    euclid: {
      title: 'Euclid',
      inputsGroups: [
        [
          {
            title: 'ΔX',
            value: offset.x,
            step,
            setValue: (value) => setOffset({ ...offset, x: value }),
          },
          {
            title: 'ΔY',
            value: -offset.y,
            step,
            setValue: (value) => setOffset({ ...offset, y: -value }),
          },
        ],
        [
          {
            title: 'Rotate',
            value: rotateDegrees,
            step,
            unit: 'deg',
            setValue: setRotateDegrees,
          },
          {
            title: 'Pivot X',
            value: pivot.x - center.x,
            step,
            setValue: (value) => setPivot({ ...pivot, x: value + center.x }),
          },
          {
            title: 'Pivot Y',
            value: -pivot.y + center.y,
            step,
            setValue: (value) => setPivot({ ...pivot, y: -value + center.y }),
          },
        ],
      ],
    },
    affine: {
      title: 'Affine',
      inputsGroups: [
        [
          {
            title: 'r0x',
            value: affine.r0.x,
            step,
            setValue: (value) =>
              setAffine({ ...affine, r0: { ...affine.r0, x: value } }),
          },
          {
            title: 'r0y',
            value: affine.r0.y,
            step,
            setValue: (value) =>
              setAffine({ ...affine, r0: { ...affine.r0, y: value } }),
          },
        ],
        [
          {
            title: 'rXx',
            value: affine.rX.x,
            step,
            setValue: (value) =>
              setAffine({ ...affine, rX: { ...affine.rX, x: value } }),
          },
          {
            title: 'rXy',
            value: affine.rX.y,
            step,
            setValue: (value) =>
              setAffine({ ...affine, rX: { ...affine.rX, y: value } }),
          },
        ],
        [
          {
            title: 'rYx',
            value: affine.rY.x,
            step,
            setValue: (value) =>
              setAffine({ ...affine, rY: { ...affine.rY, x: value } }),
          },
          {
            title: 'rYy',
            value: affine.rY.y,
            step,
            setValue: (value) =>
              setAffine({ ...affine, rY: { ...affine.rY, y: value } }),
          },
        ],
      ],
    },
    projective: {
      title: 'Projective',
      inputsGroups: [
        [
          {
            title: 'r0x',
            value: projective.r0.x,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                r0: { ...projective.r0, x: value },
              }),
          },
          {
            title: 'r0y',
            value: projective.r0.y,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                r0: { ...projective.r0, y: value },
              }),
          },
        ],
        [
          {
            title: 'rXx',
            value: projective.rX.x,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                rX: { ...projective.rX, x: value },
              }),
          },
          {
            title: 'rXy',
            value: projective.rX.y,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                rX: { ...projective.rX, y: value },
              }),
          },
        ],
        [
          {
            title: 'rYx',
            value: projective.rY.x,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                rY: { ...projective.rY, x: value },
              }),
          },
          {
            title: 'rYy',
            value: projective.rY.y,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                rY: { ...projective.rY, y: value },
              }),
          },
        ],
        [
          {
            title: 'w0',
            value: projective.w0,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                w0: value,
              }),
          },
          {
            title: 'wx',
            value: projective.w.x,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                w: { ...projective.w, x: value },
              }),
          },
          {
            title: 'wy',
            value: projective.w.y,
            step,
            setValue: (value) =>
              setProjective({
                ...projective,
                w: { ...projective.w, y: value },
              }),
          },
        ],
      ],
    },
  };

  useEffect(() => {
    if (currentTabName === tabs.projective.title) {
      setGridModifiers([
        ...defaultAxesModifiers,
        bindProjectivePointWithOffset(normalizedProjective, center),
      ]);
      setAxesModifiers([
        ...defaultAxesModifiers,
        bindAffinePointWithOffset(normalizedProjectiveForAxes, center),
      ]);
    } else {
      setAxesModifiers(defaultAxesModifiers);
      setGridModifiers(defaultAxesModifiers);
    }
  }, [
    defaultAxesModifiers,
    currentTabName,
    normalizedProjective,
    tabs.projective.title,
    normalizedProjectiveForAxes,
  ]);

  return (
    <div className="d-flex justify-conten`t-between my-3 mx-5">
      <DimensionsInputs
        tabs={Object.values(tabs)}
        onSelect={setCurrentTabName}
      />
      <Col>
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
              modifiers={axesModifiers}
            />
            <ModifiableCircle
              position={pivot}
              modifiers={gridModifiers}
              radius={5}
              fill="red"
            />
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
        <Col md={2} className="border rounded-bottom bg-light ml-2 text-center">
          {width}✕{height}
        </Col>
      </Col>
      <img src={exampleImage} alt="example" style={{ height }} />
    </div>
  );
};

export default App;
