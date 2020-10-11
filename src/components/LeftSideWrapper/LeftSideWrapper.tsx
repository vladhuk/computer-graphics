import React, { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';
import './LeftSideWrapper.css';

const LeftSideWrapper: FunctionComponent = ({ children }) => (
  <Col md={3} className="left-side-wrapper">
    {children}
  </Col>
);

export default LeftSideWrapper;
