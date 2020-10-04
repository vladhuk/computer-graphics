import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Grid from '../Grid';
import './App.css';
import Axes from '../Axes';
import { FormTab } from '../DimensionsForm';
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
import { bindNormalizeVectorValueToCenter } from './App.service';
import Lab1 from '../labsPages/Lab1';
import Header from '../Header';

const canvasWidth = 800;
const canvasHeight = 800;
const canvasCenter: Coord = { x: canvasWidth / 2, y: canvasHeight / 2 };

const normalizeVectorValue = bindNormalizeVectorValueToCenter(canvasCenter);

const App: FunctionComponent = () => {
  const [currentTabName, setCurrentTabName] = useState<string | null>();
  const [cellLength, setCellLength] = useState(25);
  const [step, setStep] = useState(5);
  const [offset, setOffset] = useState<Coord>({ x: 0, y: 0 });
  const [rotateDegrees, setRotateDegrees] = useState(0);
  const [pivot, setPivot] = useState<Coord>(canvasCenter);
  const [affine, setAffine] = useState<Affine>({
    r0: { x: 0, y: 0 },
    rX: { x: canvasCenter.x, y: 0 },
    rY: { x: 0, y: canvasCenter.y },
  });
  const normalizedAffine = useMemo<Affine>(
    () => ({
      ...affine,
      rX: normalizeVectorValue(affine.rX),
      rY: normalizeVectorValue(affine.rY),
    }),
    [affine]
  );
  const [projective, setProjective] = useState<Projective>({
    r0: { x: 0, y: 0 },
    rX: { x: 800, y: 0 },
    rY: { x: 0, y: 800 },
    w0: 800,
    w: { x: canvasCenter.x, y: canvasCenter.y },
  });
  const normalizedProjective = useMemo<Projective>(
    () => ({
      ...projective,
      w: normalizeVectorValue(projective.w),
    }),
    [projective]
  );
  const normalizedProjectiveForAxes = useMemo<Affine>(
    () => ({
      ...projective,
      rX: normalizeVectorValue(projective.rX),
      rY: normalizeVectorValue(projective.rY),
    }),
    [projective]
  );

  const defaultAxesModifiers = useMemo<PointModifier[]>(
    () => [bindAffinePointWithOffset(normalizedAffine, canvasCenter)],
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

  const linearTransformationTabs: Record<string, FormTab> = {
    common: {
      title: 'Common',
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
            value: pivot.x - canvasCenter.x,
            step,
            setValue: (value) =>
              setPivot({ ...pivot, x: value + canvasCenter.x }),
          },
          {
            title: 'Pivot Y',
            value: -pivot.y + canvasCenter.y,
            step,
            setValue: (value) =>
              setPivot({ ...pivot, y: -value + canvasCenter.y }),
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
    if (currentTabName === linearTransformationTabs.projective.title) {
      setGridModifiers([
        ...defaultAxesModifiers,
        bindProjectivePointWithOffset(normalizedProjective, canvasCenter),
      ]);
      setAxesModifiers([
        ...defaultAxesModifiers,
        bindAffinePointWithOffset(normalizedProjectiveForAxes, canvasCenter),
      ]);
    } else {
      setAxesModifiers(defaultAxesModifiers);
      setGridModifiers(defaultAxesModifiers);
    }
  }, [
    defaultAxesModifiers,
    currentTabName,
    normalizedProjective,
    linearTransformationTabs.projective.title,
    normalizedProjectiveForAxes,
  ]);

  const defaultCanvasElements = (
    <>
      <Grid
        width={canvasWidth}
        height={canvasHeight}
        center={canvasCenter}
        cellLength={cellLength}
        modifiers={gridModifiers}
      />
      <Axes
        width={canvasWidth}
        height={canvasHeight}
        center={canvasCenter}
        modifiers={axesModifiers}
      />
      <ModifiableCircle
        position={pivot}
        modifiers={gridModifiers}
        radius={5}
        fill="red"
      />
    </>
  );

  const lab1 = (
    <Lab1
      tabs={Object.values(linearTransformationTabs)}
      onSelectTab={setCurrentTabName}
      canvasCenter={canvasCenter}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      step={step}
      shapeModifiers={shapeModifiers}
      defaultCanvasElements={defaultCanvasElements}
    />
  );

  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/lab1">
            {lab1}
          </Route>
          <Redirect exact from="/" to="/lab1" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
