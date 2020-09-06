import React, { FunctionComponent, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Grid from '../Grid';
import './App.css';
import Axes from '../Axes';
import exampleImage from '../../assets/examples/example1.png';
import DimensionsInputs from '../DimensionsForm';
import Figure from '../Figure';
import Coord from '../../types/Coord';

const App: FunctionComponent = () => {
  const [R, setR] = useState(100);
  const [L1, setL1] = useState(400);
  const [L2, setL2] = useState(100);
  const [L3, setL3] = useState(400);
  const [L4, setL4] = useState(600);
  const [cellLength, setCellLength] = useState(25);
  const [offset, setOffset] = useState<Coord>({ x: 0, y: 0 });

  const width = 800;
  const height = 800;

  return (
    <div className="d-flex justify-content-between my-3 mx-5">
      <DimensionsInputs
        inputsGroups={[
          [
            {
              title: 'Cell length',
              value: cellLength,
              min: 1,
              setValue: setCellLength,
            },
          ],
          [
            { title: 'R', value: R, min: 0, setValue: setR },
            { title: 'L1', value: L1, min: 0, setValue: setL1 },
            { title: 'L2', value: L2, min: 0, setValue: setL2 },
            { title: 'L3', value: L3, min: 0, setValue: setL3 },
            { title: 'L4', value: L4, min: 0, setValue: setL4 },
          ],
          [
            {
              title: 'Offset X',
              value: offset.x,
              setValue: (value) => setOffset({ x: value, y: offset.y }),
            },
            {
              title: 'Offset Y',
              value: -offset.y,
              setValue: (value) => setOffset({ x: offset.x, y: -value }),
            },
          ],
        ]}
      />
      <Stage width={width} height={height}>
        <Layer>
          <Grid width={width} height={height} cellLength={cellLength} />
          <Axes width={width} height={height} />
          <Figure
            center={{ x: width / 2 + offset.x, y: height / 2 + offset.y }}
            R={R}
            L1={L1}
            L2={L2}
            L3={L3}
            L4={L4}
          />
        </Layer>
      </Stage>
      <img src={exampleImage} alt="example" style={{ height }} />
    </div>
  );
};

export default App;
