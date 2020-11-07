import React, { FunctionComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export interface FormCheckbox {
  title: string;
  value: boolean;
  setValue(value: boolean): void;
}

const Input: FunctionComponent<FormCheckbox> = ({ title, value, setValue }) => (
  <Form.Group as={Row} key={title}>
    <Form.Label column>{title}</Form.Label>
    <Col md={3} className="d-flex align-items-center">
      <Form.Check
        type="checkbox"
        checked={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.checked)
        }
      />
    </Col>
  </Form.Group>
);

export default Input;
