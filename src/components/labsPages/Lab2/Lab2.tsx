import React, { FunctionComponent, useState } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import exampleImage from '../../../assets/examples/example2.png';
import Curve from './Curve';
import Asymptote from './Asymptote';

interface Props {
  tabs: FormTab[];
  onSelectTab: (tabName: string | null) => void;
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
  maxCoord,
  canvasWidth,
  canvasHeight,
  step,
  shapeModifiers,
  defaultCanvasElements,
}) => {
  const [a, setA] = useState(200);

  const tabName = 'Curve';

  const allTabs: FormTab[] = [
    ...tabs,
    {
      title: tabName,
      inputsGroups: [[{ title: 'a', value: a, step, setValue: setA }]],
    },
  ];

  return (
    <PageWrapper>
      <DimensionsForm
        tabs={allTabs}
        defaultTab={tabName}
        onSelect={onSelectTab}
      />
      <CustomCanvas width={canvasWidth} height={canvasHeight}>
        {defaultCanvasElements}
        <Curve modifiers={shapeModifiers} maxCoord={maxCoord} a={a} />
        <Asymptote
          a={a}
          maxCoord={maxCoord}
          color="red"
          modifiers={shapeModifiers}
        />
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
