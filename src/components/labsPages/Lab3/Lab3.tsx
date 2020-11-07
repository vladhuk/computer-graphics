import React, { FunctionComponent, useState } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import exampleImage1 from '../../../assets/examples/example3-1.png';
import exampleImage2 from '../../../assets/examples/example3-2.png';
import LeftSideWrapper from '../../LeftSideWrapper';
import CheckboxesForm from '../../CheckboxesForm';
import { CheckboxType, FormCheckbox } from '../../CheckboxesForm/Checkbox';
import Picture from './Picture';
import { sharkPoints, swanPoints } from './picturesPoints';

interface Props {
  tabs: FormTab[];
  onSelectTab(tabName: string | null): void;
  canvasWidth: number;
  canvasHeight: number;
  modifiers?: PointModifier[];
  isEnabledDragging?: boolean;
  dndModifiers?: PointModifier[];
  defaultCanvasElements?: JSX.Element;
}

const Lab3: FunctionComponent<Props> = ({
  tabs,
  onSelectTab,
  canvasWidth,
  canvasHeight,
  modifiers,
  isEnabledDragging,
  dndModifiers,
  defaultCanvasElements,
}) => {
  const [isEnabledSupportingLines, setEnabledSupportingLines] = useState(false);
  const [sharkOrSwan, setSharkOrSwan] = useState(false);

  const checkboxes: FormCheckbox[] = [
    {
      title: 'Supporting lines',
      value: isEnabledSupportingLines,
      setValue: setEnabledSupportingLines,
    },
    {
      title: 'Shark/Swan',
      value: sharkOrSwan,
      setValue: setSharkOrSwan,
      type: CheckboxType.SWITCH,
    },
  ];

  return (
    <PageWrapper>
      <LeftSideWrapper>
        <DimensionsForm tabs={tabs} onSelect={onSelectTab} />
        <CheckboxesForm checkboxes={checkboxes} />
      </LeftSideWrapper>
      <CustomCanvas width={canvasWidth} height={canvasHeight}>
        <Picture
          picturePoints={sharkOrSwan ? swanPoints : sharkPoints}
          modifiers={modifiers}
          dndModifiers={dndModifiers}
          isEnabledDragging={isEnabledDragging}
          isEnabledSupportingLines={isEnabledSupportingLines}
        />
        {defaultCanvasElements}
      </CustomCanvas>
      <div>
        <img src={exampleImage1} alt="example" style={{ width: '100%' }} />
        <img src={exampleImage2} alt="example" style={{ width: '100%' }} />
      </div>
    </PageWrapper>
  );
};

export default Lab3;
