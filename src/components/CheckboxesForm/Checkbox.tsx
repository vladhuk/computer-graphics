import React, { FunctionComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export enum CheckboxType {
  CHECKBOX = 'checkbox',
  SWITCH = 'switch',
}

export interface FormCheckbox {
  title: string;
  value: boolean;
  setValue(value: boolean): void;
  type?: CheckboxType;
  disabled?: boolean;
  onClick?: () => void;
}

const Input: FunctionComponent<FormCheckbox> = ({
  title,
  value,
  setValue,
  type,
  disabled,
  onClick,
}) => (
  <Form.Group as={Row} key={title}>
    <Form.Label column>{title}</Form.Label>
    <Col md={3} className="d-flex align-items-center justify-content-center">
      <Form.Check
        custom
        id={title}
        label=""
        type={type}
        disabled={disabled}
        checked={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.checked)
        }
        onClick={onClick}
      />
    </Col>
  </Form.Group>
);

export default Input;
