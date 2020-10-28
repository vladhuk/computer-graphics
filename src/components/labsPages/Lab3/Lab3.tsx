import React, { FunctionComponent } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import exampleImage from '../../../assets/examples/example3.png';
import LeftSideWrapper from '../../LeftSideWrapper';
import Picture from './Picture';

interface Props {
  tabs: FormTab[];
  canvasWidth: number;
  canvasHeight: number;
  shapeModifiers?: PointModifier[];
  defaultCanvasElements?: JSX.Element;
}

const Lab3: FunctionComponent<Props> = ({
  tabs,
  canvasWidth,
  canvasHeight,
  shapeModifiers,
  defaultCanvasElements,
}) => {
  return (
    <PageWrapper>
      <LeftSideWrapper>
        <DimensionsForm tabs={tabs} />
      </LeftSideWrapper>
      <CustomCanvas width={canvasWidth} height={canvasHeight}>
        {defaultCanvasElements}
        <Picture modifiers={shapeModifiers} />
      </CustomCanvas>
      <div>
        <img src={exampleImage} alt="example" style={{ width: '100%' }} />
      </div>
    </PageWrapper>
  );
};

export default Lab3;
