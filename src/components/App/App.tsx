import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Grid from '../Grid';
import './App.css';
import Axes from '../Axes';
import { FormTab } from '../DimensionsForm';
import Coord from '../../types/Coord';
import PointModifier from '../../types/PointModifier';
import Affine from '../../types/Affine';
import Projective from '../../types/Projective';
import {
  bindNormalizeVectorValueToAxesMaxCoord,
  bindOffsetPoint,
  bindRotatePointByDegreesWithPivot,
  bindInvertY,
  bindAffinePoint,
  bindProjectivePoint,
} from './App.service';
import Lab1 from '../labsPages/Lab1';
import Header from '../Header';
import Lab2 from '../labsPages/Lab2';
import Pivot from '../Pivot';
import Lab3 from '../labsPages/Lab3/Lab3';
import ModifiableDndOptions from '../modifiableKonvaShapes/ModifiableDndOptions';
import Lab5 from '../labsPages/Lab5';
import Lab6 from '../labsPages/Lab6';
import Lab7 from '../labsPages/Lab7';

const canvasWidth = 800;
const canvasHeight = 800;
const canvasCenter: Coord = { x: canvasWidth / 2, y: canvasHeight / 2 };

const defaultAxesModifiers = [bindInvertY(), bindOffsetPoint(canvasCenter)];

const normalizeVectorValue = bindNormalizeVectorValueToAxesMaxCoord(
  canvasCenter
);

const App: FunctionComponent = () => {
  const [currentTabName, setCurrentTabName] = useState<string | null>();
  const [isEnabledDragging, setEnabledDragging] = useState(true);
  const [cellLength, setCellLength] = useState(25);
  const [step, setStep] = useState(5);
  const [offset, setOffset] = useState<Coord>({ x: 0, y: 0 });
  const [rotateDegrees, setRotateDegrees] = useState(0);
  const [pivot, setPivot] = useState<Coord>({ x: 0, y: 0 });
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

  const [axesModifiers, setAxesModifiers] = useState<PointModifier[]>(
    defaultAxesModifiers
  );
  const [gridModifiers, setGridModifiers] = useState<PointModifier[]>(
    defaultAxesModifiers
  );
  const getShapeModifiers = (
    customModifiers?: PointModifier[]
  ): PointModifier[] => [
    bindOffsetPoint(offset),
    bindRotatePointByDegreesWithPivot(rotateDegrees, pivot),
    ...(customModifiers || []),
    ...gridModifiers,
  ];

  const defaultDndModifiers: PointModifier[] = [
    bindOffsetPoint({ x: -canvasCenter.x, y: -canvasCenter.y }),
    bindInvertY(),
  ];
  const pivotDndModifiers: PointModifier[] = defaultDndModifiers;
  const shapeDndModifiers: PointModifier[] = [
    ...defaultDndModifiers,
    bindRotatePointByDegreesWithPivot(-rotateDegrees, pivot),
    bindOffsetPoint({ x: -offset.x, y: -offset.y }),
  ];

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
            value: offset.y,
            step,
            setValue: (value) => setOffset({ ...offset, y: value }),
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
            value: pivot.x,
            step,
            setValue: (value) => setPivot({ ...pivot, x: value }),
          },
          {
            title: 'Pivot Y',
            value: pivot.y,
            step,
            setValue: (value) => setPivot({ ...pivot, y: value }),
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
    // We should enable affine and projective transformation only on their own tab
    // Also disable canvas objects dragging on this tabs
    if (currentTabName === linearTransformationTabs.projective.title) {
      setAxesModifiers([
        bindAffinePoint(normalizedProjectiveForAxes),
        ...defaultAxesModifiers,
      ]);
      setGridModifiers([
        bindProjectivePoint(normalizedProjective),
        ...defaultAxesModifiers,
      ]);
      setEnabledDragging(false);
    } else if (currentTabName === linearTransformationTabs.affine.title) {
      setAxesModifiers([
        bindAffinePoint(normalizedAffine),
        ...defaultAxesModifiers,
      ]);
      setGridModifiers([
        bindAffinePoint(normalizedAffine),
        ...defaultAxesModifiers,
      ]);
      setEnabledDragging(false);
    } else {
      setAxesModifiers(defaultAxesModifiers);
      setGridModifiers(defaultAxesModifiers);
      setEnabledDragging(true);
    }
  }, [
    currentTabName,
    normalizedProjective,
    linearTransformationTabs.affine.title,
    linearTransformationTabs.projective.title,
    normalizedProjectiveForAxes,
    normalizedAffine,
  ]);

  const defaultCanvasElements = (
    <>
      <Grid
        maxCoord={canvasCenter}
        cellLength={cellLength}
        modifiers={gridModifiers}
      />
      <Axes maxCoord={canvasCenter} modifiers={axesModifiers} />
      <Pivot
        position={pivot}
        modifiers={gridModifiers}
        dndOptions={
          new ModifiableDndOptions({
            draggable: isEnabledDragging,
            onDragMove: setPivot,
            modifiers: pivotDndModifiers,
          })
        }
      />
    </>
  );

  const defaultLabProps = {
    tabs: Object.values(linearTransformationTabs),
    onSelectTab: setCurrentTabName,
    maxCoord: canvasCenter,
    canvasWidth,
    canvasHeight,
    step,
    modifiers: getShapeModifiers(),
    getModifiers: getShapeModifiers,
    dndModifiers: shapeDndModifiers,
    isEnabledDragging,
    defaultCanvasElements,
  };

  const lab1 = <Lab1 {...defaultLabProps} />;
  const lab2 = <Lab2 {...defaultLabProps} />;
  const lab3 = <Lab3 {...defaultLabProps} />;
  const lab5 = <Lab5 {...defaultLabProps} />;
  const lab6 = <Lab6 {...defaultLabProps} />;
  const lab7 = <Lab7 {...defaultLabProps} />;

  return (
    <>
      <Header />
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/lab1">
            {lab1}
          </Route>
          <Route exact path="/lab2">
            {lab2}
          </Route>
          <Route exact path="/lab3">
            {lab3}
          </Route>
          <Route exact path="/lab5">
            {lab5}
          </Route>
          <Route exact path="/lab6">
            {lab6}
          </Route>
          <Route exact path="/lab7">
            {lab7}
          </Route>
          <Redirect exact from="/" to="/lab1" />
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
