import React, { FunctionComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Coord from '../../types/Coord';

interface FormInput {
  title: string;
  value: number;
  setValue(value: number): void;
}

interface Props {
  formInputs: FormInput[];
}

const DimensionsInputs: FunctionComponent<Props> = ({ formInputs }) => {
  const getFormGroup = ({ title, value, setValue }: FormInput) => (
    <Form.Group as={Row}>
      <Form.Label column>{title}</Form.Label>
      <Col md={8}>
        <Form.Control
          type="number"
          min={0}
          required
          value={value}
          onChange={(event) => setValue(parseFloat(event.target.value))}
        />
      </Col>
    </Form.Group>
  );

  return (
    <Form className="border rounded p-2 bg-light">
      {formInputs.map(getFormGroup)}
    </Form>
  );
};

export default DimensionsInputs;
