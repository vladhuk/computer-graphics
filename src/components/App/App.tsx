import React, { FunctionComponent } from 'react';
import { Stage, Layer } from 'react-konva';
import Grid from '../Grid';
import './App.css';
import Axes from '../Axes';

const App: FunctionComponent = () => {
  const width = 700;
  const height = 700;

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Grid width={width} height={height} spacing={25} />
        <Axes width={width} height={height} />
      </Layer>
    </Stage>
  );
};

export default App;
