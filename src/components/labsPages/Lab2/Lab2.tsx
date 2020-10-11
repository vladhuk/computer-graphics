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
import Normal from './Normal';
import { bindRotatePointByDeegrees } from '../../../util/grapchicFunctions';
import InfoBlock, { InfoRecord } from '../../InfoBlock';
import LeftSideWrapper from '../../LeftSideWrapper';

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
  const [x0, setX0] = useState(0);

  const descartesFolium = new DescartesFolium(a);

  // Prefered rotation for Descartes Folium is 135deg
  useEffect(() => setRotateDegrees(135), [setRotateDegrees]);

  // For elements, which needs 135 deg rotation
  const rotateModifiers: PointModifier[] = [
    bindRotatePointByDeegrees(-135),
    ...(shapeModifiers || []),
  ];

  const tabName = 'Curve';

  const allTabs: FormTab[] = [
    ...tabs,
    {
      title: tabName,
      inputsGroups: [
        [{ title: 'a', value: a, step, setValue: setA }],
        [{ title: 'x0', value: x0, step, setValue: setX0 }],
      ],
    },
  ];

  const infoRecords: InfoRecord[] = [
    {
      title: 'S<OCAB>',
      value: descartesFolium.calculateS(),
      unit: 'px',
    },
    {
      title: 'S<OVU>',
      value: descartesFolium.calculateS(),
      unit: 'px',
    },
  ];

  const defaultProps = {
    descartesFolium,
    maxCoord,
    modifiers: shapeModifiers,
  };

  const defaultPropsForAdditionalLines = {
    ...defaultProps,
    x: x0,
    modifiers: rotateModifiers,
  };

  return (
    <PageWrapper>
      <LeftSideWrapper>
        <DimensionsForm
          tabs={allTabs}
          defaultTab={tabName}
          onSelect={onSelectTab}
        />
        <InfoBlock records={infoRecords} />
      </LeftSideWrapper>
      <CustomCanvas width={canvasWidth} height={canvasHeight}>
        {defaultCanvasElements}
        <Curve {...defaultProps} />
        <Asymptote color="red" {...defaultProps} />
        <Tangent color="skyblue" {...defaultPropsForAdditionalLines} />
        <Normal color="hotpink" {...defaultPropsForAdditionalLines} />
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
