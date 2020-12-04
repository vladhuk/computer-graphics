import React, { FunctionComponent, useEffect, useState } from 'react';
import CustomCanvas from '../../CustomCanvas';
import PageWrapper from '../../PageWraper';
import PointModifier from '../../../types/PointModifier';
import DimensionsForm, { FormTab } from '../../DimensionsForm';
import exampleImage1 from '../../../assets/examples/example3-1.png';
import exampleImage2 from '../../../assets/examples/example3-2.png';
import LeftSideWrapper from '../../LeftSideWrapper';
import CheckboxesForm, {
  CheckboxType,
  FormCheckbox,
} from '../../CheckboxesForm';
import Picture from './Picture';
import { sharkParts, swanParts } from './picturesParts';
import { getFrames } from './Lab3.service';
import PicturePart from '../../../types/PicturePart';

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

const framesAmount = 15;
const durationMillis = 500;
const intervalMillis = durationMillis / framesAmount;

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
  const [framesCounter, setFramesCounter] = useState(-1);
  const [parts, setParts] = useState(sharkOrSwan ? swanParts : sharkParts);
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timer>();
  const [frames, setFrames] = useState<PicturePart[][]>([]);

  useEffect(() => {
    if (sharkOrSwan) {
      setFrames(getFrames(parts, swanParts, framesAmount));
    } else {
      setFrames(getFrames(parts, sharkParts, framesAmount));
    }
    // We need to calculate only with start points. If we will add 'points' according to eslint,
    // it will recalculate frames with new value every time when we will change the frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharkOrSwan]);

  const enableAnimation = () => {
    let i = 0;
    const interval = setInterval(() => {
      setFramesCounter(i);
      i += 1;
    }, intervalMillis);
    setCurrentInterval(interval);
  };

  useEffect(() => {
    if (framesCounter < 0) {
      return;
    }

    setParts(frames[framesCounter]);

    if (framesCounter + 1 === framesAmount + 2) {
      setFramesCounter(-1);
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    }
  }, [currentInterval, frames, framesCounter]);

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
      onClick: enableAnimation,
      disabled: framesCounter !== -1,
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
          parts={parts}
          setParts={setParts}
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
