import React, { FunctionComponent, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import Grid from '../Grid';
import './App.css';
import Axes from '../Axes';
import exampleImage from '../../assets/examples/example1.png';
import DimensionsInputs from '../DimensionsInputs';

const App: FunctionComponent = () => {
  const [R, setR] = useState(15);
  const [L1, setL1] = useState(50);
  const [L2, setL2] = useState(30);
  const [L3, setL3] = useState(40);
  const [L4, setL4] = useState(60);

  const width = 800;
  const height = 800;

  return (
    <div className="d-flex justify-content-between my-3 mx-5">
      <DimensionsInputs
        formInputs={[
          { title: 'R', value: R, setValue: setR },
          { title: 'L1', value: L1, setValue: setL1 },
          { title: 'L2', value: L2, setValue: setL2 },
          { title: 'L3', value: L3, setValue: setL3 },
          { title: 'L4', value: L4, setValue: setL4 },
        ]}
      />
      <Stage width={width} height={height}>
        <Layer>
          <Grid width={width} height={height} spacing={25} />
          <Axes width={width} height={height} />
        </Layer>
      </Stage>
      <img src={exampleImage} alt="example" style={{ height }} />
    </div>
  );
};

export default App;
