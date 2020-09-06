import React, { FunctionComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { isValidValue } from './Input.service';

export interface FormInput {
  title: string;
  value: number;
  min?: number;
  setValue(value: number): void;
}

type Props = FormInput;

const Input: FunctionComponent<Props> = ({ title, value, min, setValue }) => (
  <Form.Group as={Row} key={title}>
    <Form.Label column md={4}>
      {title}
    </Form.Label>
    <Col md={6}>
      <Form.Control
        type="number"
        min={min}
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
      px
    </Form.Label>
  </Form.Group>
);

export default Input;
