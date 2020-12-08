import React, { FunctionComponent, useState } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import LeftSideWrapper from '../../LeftSideWrapper';
import { getHouseLines } from './picturesLines';
import Picture from './Picture';
import { bindCreateOnePointPerspective } from './Lab5.service';

import exampleImage from '../../../assets/examples/example5.png';

interface Props {
  tabs: FormTab[];
  onSelectTab(tabName: string | null): void;
  canvasWidth: number;
  canvasHeight: number;
  step?: number;
  defaultCanvasElements?: JSX.Element;
  getModifiers?(modifiers: PointModifier[]): PointModifier[];
}

const Lab5: FunctionComponent<Props> = ({
  tabs,
  onSelectTab,
  canvasWidth,
  canvasHeight,
  step,
  getModifiers,
  defaultCanvasElements,
}) => {
  const [viewPoint, setViewPoint] = useState(1000);
  const [L, setL] = useState(150);
  const [H, setH] = useState(250);
  const [R1, setR1] = useState(180);
  const [R2, setR2] = useState(180);
  const [W, setW] = useState(30);

  const modifiers = getModifiers?.([bindCreateOnePointPerspective(viewPoint)]);

  const tabName = 'Picture';

  const allTabs: FormTab[] = [
    ...tabs,
    {
      title: tabName,
      inputsGroups: [
        [
          {
            title: 'View point',
            value: viewPoint,
            step,
            setValue: setViewPoint,
          },
        ],
        [
          { title: 'L', value: L, min: 0, step, setValue: setL },
          { title: 'H', value: H, min: 0, step, setValue: setH },
          { title: 'R1', value: R1, min: 0, step, setValue: setR1 },
          { title: 'R2', value: R2, min: 0, step, setValue: setR2 },
          { title: 'W', value: W, min: 0, step, setValue: setW },
        ],
      ],
    },
  ];

  const houseLines = getHouseLines({ L, H, R1, R2, W });

  return (
    <PageWrapper>
      <LeftSideWrapper>
        <DimensionsForm
          tabs={allTabs}
          defaultTab={tabName}
          onSelect={onSelectTab}
        />
      </LeftSideWrapper>
      <CustomCanvas width={canvasWidth} height={canvasHeight}>
        <Picture pictureLines={houseLines} modifiers={modifiers} />
        {defaultCanvasElements}
      </CustomCanvas>
      <div>
        <img src={exampleImage} alt="example" style={{ width: '100%' }} />
      </div>
    </PageWrapper>
  );
};

export default Lab5;
