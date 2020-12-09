import React, { FunctionComponent, useState } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import LeftSideWrapper from '../../LeftSideWrapper';
import { getEllipticParaboloidLines } from './Lab6.service';
import { bindCreateOnePointPerspective } from '../../../util/math';
import ModifiableLinePicture from '../../modifiableKonvaShapes/ModifiableLinePicture';

interface Props {
  tabs: FormTab[];
  onSelectTab(tabName: string | null): void;
  canvasWidth: number;
  canvasHeight: number;
  step?: number;
  defaultCanvasElements?: JSX.Element;
  getModifiers?(modifiers: PointModifier[]): PointModifier[];
}

const Lab6: FunctionComponent<Props> = ({
  tabs,
  onSelectTab,
  canvasWidth,
  canvasHeight,
  step,
  getModifiers,
  defaultCanvasElements,
}) => {
  const [viewPoint, setViewPoint] = useState(1000);
  const [gridDensity, setGridDensity] = useState(20);
  const [l, setL] = useState(200);
  const [a, setA] = useState(15);
  const [b, setB] = useState(15);

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
          {
            title: 'Grid density',
            value: gridDensity,
            min: 1,
            setValue: setGridDensity,
          },
        ],
        [
          { title: 'l', value: l, min: 1, step, setValue: setL },
          { title: 'a', value: a, unit: ' ', setValue: setA },
          { title: 'b', value: b, unit: ' ', setValue: setB },
        ],
      ],
    },
  ];

  const pictureLines = getEllipticParaboloidLines({ gridDensity, l, a, b });

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
        <ModifiableLinePicture
          lines={pictureLines}
          modifiers={modifiers}
          strokeWidth={1}
        />
        {defaultCanvasElements}
      </CustomCanvas>
    </PageWrapper>
  );
};

export default Lab6;
