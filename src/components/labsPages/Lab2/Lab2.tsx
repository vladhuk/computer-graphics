import React, { FunctionComponent, useState } from 'react';
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
import InfoBlock, { InfoRecord } from '../../InfoBlock';
import LeftSideWrapper from '../../LeftSideWrapper';

interface Props {
  tabs: FormTab[];
  onSelectTab(tabName: string | null): void;
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
  const [a, setA] = useState(150);
  const [phi0, setPhi0] = useState(0);

  const descartesFolium = new DescartesFolium(a);

  const tabName = 'Curve';

  const allTabs: FormTab[] = [
    ...tabs,
    {
      title: tabName,
      inputsGroups: [
        [{ title: 'a', value: a, step, setValue: setA }],
        [{ title: 'phi0', value: phi0, step, unit: 'deg', setValue: setPhi0 }],
      ],
    },
  ];

  const infoRecords: InfoRecord[] = [
    {
      title: 'S<OCAB>',
      value: descartesFolium.calculateS(),
      unit: 'px²',
    },
    {
      title: 'S<OVU>',
      value: descartesFolium.calculateS(),
      unit: 'px²',
    },
    {
      title: 'Curvature radius',
      value: descartesFolium.calculateCurvatureR(phi0).toFixed(1),
      unit: 'px',
    },
  ];

  const defaultProps = {
    descartesFolium,
    maxCoord,
    phi: phi0,
    modifiers: shapeModifiers,
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
        <Tangent color="skyblue" {...defaultProps} />
        <Normal color="hotpink" {...defaultProps} />
      </CustomCanvas>
      <div>
        <img src={exampleImage} alt="example" style={{ width: '100%' }} />
      </div>
    </PageWrapper>
  );
};

export default Lab2;
