import React, { FunctionComponent, useEffect, useState } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import exampleImage from '../../../assets/examples/example2.png';
import Curve from './Curve';
import Asymptote from './Asymptote';
import DescartesFolium from './DescartesFolium';
import Tangent from './Tangent';

interface Props {
  tabs: FormTab[];
  onSelectTab(tabName: string | null): void;
  setRotateDegrees(degrees: number): void;
  maxCoord: Coord;
  canvasWidth: number;
  canvasHeight: number;
  step?: number;
  shapeModifiers?: PointModifier[];
  defaultCanvasElements?: JSX.Element;
}

const Lab2: FunctionComponent<Props> = ({
  tabs,
  onSelectTab,
  setRotateDegrees,
  maxCoord,
  canvasWidth,
  canvasHeight,
  step,
  shapeModifiers,
  defaultCanvasElements,
}) => {
  const [a, setA] = useState(150);
  const [tangentX, setTangentX] = useState(0);

  const descartesFolium = new DescartesFolium(a);

  // Prefered rotation for Descartes Folium is 135deg
  useEffect(() => setRotateDegrees(135), [setRotateDegrees]);

  const tabName = 'Curve';

  const allTabs: FormTab[] = [
    ...tabs,
    {
      title: tabName,
      inputsGroups: [
        [{ title: 'a', value: a, step, setValue: setA }],
        [{ title: 'Tangent X', value: tangentX, step, setValue: setTangentX }],
      ],
    },
  ];

  const defaultProps = {
    descartesFolium,
    maxCoord,
    modifiers: shapeModifiers,
  };

  return (
    <PageWrapper>
      <DimensionsForm
        tabs={allTabs}
        defaultTab={tabName}
        onSelect={onSelectTab}
      />
      <CustomCanvas width={canvasWidth} height={canvasHeight}>
        {defaultCanvasElements}
        <Curve {...defaultProps} />
        <Asymptote color="red" {...defaultProps} />
        <Tangent tangentX={tangentX} color="skyblue" {...defaultProps} />
      </CustomCanvas>
      <img
        src={exampleImage}
        alt="example"
        style={{ width: '100%', height: '100%' }}
      />
    </PageWrapper>
  );
};

export default Lab2;
