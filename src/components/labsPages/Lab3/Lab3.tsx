import React, { FunctionComponent } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import exampleImage from '../../../assets/examples/example3.png';
import LeftSideWrapper from '../../LeftSideWrapper';
import Picture from './Picture';
import { sharkPoints } from './picturesPoints';

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
}) => (
  <PageWrapper>
    <LeftSideWrapper>
      <DimensionsForm tabs={tabs} onSelect={onSelectTab} />
    </LeftSideWrapper>
    <CustomCanvas width={canvasWidth} height={canvasHeight}>
      <Picture
        picturePoints={sharkPoints}
        modifiers={modifiers}
        dndModifiers={dndModifiers}
        isEnabledDragging={isEnabledDragging}
      />
      {defaultCanvasElements}
    </CustomCanvas>
    <div>
      <img src={exampleImage} alt="example" style={{ width: '100%' }} />
    </div>
  </PageWrapper>
);

export default Lab3;
