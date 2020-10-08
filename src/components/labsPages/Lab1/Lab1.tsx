import React, { FunctionComponent, useState } from 'react';
import exampleImage from '../../../assets/examples/example1.png';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import Shape from './Shape';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';

interface Props {
  tabs: FormTab[];
  onSelectTab: (tabName: string | null) => void;
  canvasWidth: number;
  canvasHeight: number;
  step?: number;
  shapeModifiers?: PointModifier[];
  defaultCanvasElements?: JSX.Element;
}

const Lab1: FunctionComponent<Props> = ({
  tabs,
  onSelectTab,
  canvasWidth,
  canvasHeight,
  step,
  shapeModifiers,
  defaultCanvasElements,
}) => {
  const [R, setR] = useState(75);
  const [L1, setL1] = useState(300);
  const [L2, setL2] = useState(75);
  const [L3, setL3] = useState(300);
  const [L4, setL4] = useState(450);

  const tabName = 'Shape';

  const allTabs: FormTab[] = [
    ...tabs,
    {
      title: tabName,
      inputsGroups: [
        [
          { title: 'R', value: R, min: 0, step, setValue: setR },
          { title: 'L1', value: L1, min: 0, step, setValue: setL1 },
          { title: 'L2', value: L2, min: 0, step, setValue: setL2 },
          { title: 'L3', value: L3, min: 0, step, setValue: setL3 },
          { title: 'L4', value: L4, min: 0, step, setValue: setL4 },
        ],
      ],
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
        <Shape
          R={R}
          L1={L1}
          L2={L2}
          L3={L3}
          L4={L4}
          modifiers={shapeModifiers}
        />
      </CustomCanvas>
      <img src={exampleImage} alt="example" style={{ height: canvasHeight }} />
    </PageWrapper>
  );
};

export default Lab1;
