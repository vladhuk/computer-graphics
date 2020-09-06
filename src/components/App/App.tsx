import React, { FunctionComponent, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Grid from '../Grid';
import './App.css';
import Axes from '../Axes';
import exampleImage from '../../assets/examples/example1.png';
import DimensionsInputs from '../DimensionsInputs';
import Figure from '../Figure';
import Coord from '../../types/Coord';

const App: FunctionComponent = () => {
  const [R, setR] = useState(15);
  const [L1, setL1] = useState(50);
  const [L2, setL2] = useState(30);
  const [L3, setL3] = useState(40);
  const [L4, setL4] = useState(60);
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
              setValue: setCellLength,
            },
          ],
          [
            { title: 'R', value: R, setValue: setR },
            { title: 'L1', value: L1, setValue: setL1 },
            { title: 'L2', value: L2, setValue: setL2 },
            { title: 'L3', value: L3, setValue: setL3 },
            { title: 'L4', value: L4, setValue: setL4 },
          ],
          [
            {
              title: 'Offset X',
              value: offset.x,
              allowNegatives: true,
              setValue: (value) => setOffset({ x: value, y: offset.y }),
            },
            {
              title: 'Offset Y',
              value: offset.y,
              allowNegatives: true,
              setValue: (value) => setOffset({ x: offset.x, y: value }),
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