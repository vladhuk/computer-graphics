import React, { FunctionComponent, useState } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import LeftSideWrapper from '../../LeftSideWrapper';
import { getKochQuadraticCurveLine } from './Lab7.service';
import ModifiableLine from '../../modifiableKonvaShapes/ModifiableLine';

interface Props {
  tabs: FormTab[];
  onSelectTab(tabName: string | null): void;
  canvasWidth: number;
  canvasHeight: number;
  modifiers?: PointModifier[];
  defaultCanvasElements?: JSX.Element;
}

const Lab7: FunctionComponent<Props> = ({
  tabs,
  onSelectTab,
  canvasWidth,
  canvasHeight,
  modifiers,
  defaultCanvasElements,
}) => {
  const [depth, setDepth] = useState(1);
  const [lineLength, setLineLength] = useState(25);

  const tabName = 'Fractal';

  const allTabs: FormTab[] = [
    ...tabs,
    {
      title: tabName,
      inputsGroups: [
        [
          {
            title: 'Depth',
            value: depth,
            min: 0,
            unit: ' ',
            setValue: setDepth,
          },
          { title: 'Line length', value: lineLength, setValue: setLineLength },
        ],
      ],
    },
  ];

  const fractalLine = getKochQuadraticCurveLine(
    [
      { x: 0, y: 0 },
      { x: lineLength, y: 0 },
    ],
    depth
  );

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
        <ModifiableLine points={fractalLine} modifiers={modifiers} />
        {defaultCanvasElements}
      </CustomCanvas>
    </PageWrapper>
  );
};

export default Lab7;
