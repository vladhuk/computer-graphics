import React, { FunctionComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { isValidValue } from './Input.service';

export interface FormInput {
  title: string;
  value: number;
  min?: number;
  unit?: string;
  step?: number;
  setValue(value: number): void;
}

const Input: FunctionComponent<FormInput> = ({
  title,
  value,
  min,
  unit,
  step,
  setValue,
}) => (
  <Form.Group as={Row} key={title}>
    <Form.Label column md={4}>
      {title}
    </Form.Label>
    <Col md={6}>
      <Form.Control
        type="number"
        min={min}
        step={step}
        required
        value={value}
        onChange={(event) => {
          const newValue = parseFloat(event.target.value);
          if (isValidValue(newValue, { min })) {
            setValue(newValue);
          }
        }}
      />
    </Col>
    <Form.Label className="px-0" column>
      {unit || 'px'}
    </Form.Label>
  </Form.Group>
);

export default Input;
