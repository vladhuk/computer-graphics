import React, { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';
import { Layer, Stage } from 'react-konva';

interface Props {
  width: number;
  height: number;
}

const CustomCanvas: FunctionComponent<Props> = ({
  children,
  width,
  height,
}) => (
  <Col>
    <Stage width={width} height={height}>
      <Layer>{children}</Layer>
    </Stage>
    <Col md={2} className="border rounded-bottom bg-light ml-2 text-center">
      {width}✕{height}
    </Col>
  </Col>
);

export default CustomCanvas;
