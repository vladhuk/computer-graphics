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
import CheckboxesForm, { FormCheckbox } from '../../CheckboxesForm';

interface Props {
  tabs: FormTab[];
  onSelectTab(tabName: string | null): void;
  maxCoord: Coord;
  canvasWidth: number;
  canvasHeight: number;
  step?: number;
  modifiers?: PointModifier[];
  defaultCanvasElements?: JSX.Element;
}

const Lab2: FunctionComponent<Props> = ({
  tabs,
  onSelectTab,
  maxCoord,
  canvasWidth,
  canvasHeight,
  step,
  modifiers,
  defaultCanvasElements,
}) => {
  const [a, setA] = useState(150);
  const [phi0, setPhi0] = useState(0);
  const [isEnableAsymptote, setEnabledAsymptote] = useState(true);
  const [isEnableTangent, setEnabledTangent] = useState(true);
  const [isEnableNormale, setEnabledNormale] = useState(true);

  const descartesFolium = new DescartesFolium(a);

  const tabName = 'Curve';

  const allTabs: FormTab[] = [
    ...tabs,
    {
      title: tabName,
      inputsGroups: [
        [{ title: 'a', value: a, step, setValue: setA }],
        [
          {
            title: 'phi0',
            value: phi0,
            step: 1,
            unit: 'deg',
            setValue: setPhi0,
          },
        ],
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

  const checkboxes: FormCheckbox[] = [
    {
      title: 'Asymptote',
      value: isEnableAsymptote,
      setValue: setEnabledAsymptote,
    },
    {
      title: 'Tangent',
      value: isEnableTangent,
      setValue: setEnabledTangent,
    },
    {
      title: 'Normale',
      value: isEnableNormale,
      setValue: setEnabledNormale,
    },
  ];

  const defaultProps = {
    descartesFolium,
    maxCoord,
    modifiers,
    phi: phi0,
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
        <CheckboxesForm checkboxes={checkboxes} />
      </LeftSideWrapper>
      <CustomCanvas width={canvasWidth} height={canvasHeight}>
        <Curve {...defaultProps} />
        {isEnableAsymptote && <Asymptote color="red" {...defaultProps} />}
        {isEnableTangent && <Tangent color="skyblue" {...defaultProps} />}
        {isEnableNormale && <Normal color="hotpink" {...defaultProps} />}
        {defaultCanvasElements}
      </CustomCanvas>
      <div>
        <img src={exampleImage} alt="example" style={{ width: '100%' }} />
      </div>
    </PageWrapper>
  );
};

export default Lab2;
