import React, { FunctionComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface FormInput {
  title: string;
  value: number;
  allowNegatives?: boolean;
  setValue(value: number): void;
}

interface Props {
  inputsGroups: FormInput[][];
}

const DimensionsInputs: FunctionComponent<Props> = ({ inputsGroups }) => {
  const getInputsGroup = ({
    title,
    value,
    allowNegatives,
    setValue,
  }: FormInput) => (
    <Form.Group as={Row}>
      <Form.Label column md={4}>
        {title}
      </Form.Label>
      <Col md={6}>
        <Form.Control
          type="number"
          min={allowNegatives ? undefined : 0}
          required
          value={value}
          onChange={(event) => setValue(parseFloat(event.target.value))}
        />
      </Col>
      <Form.Label className="px-0" column>
        px
      </Form.Label>
    </Form.Group>
  );

  return (
    <Form className="border rounded p-2 bg-light">
      {inputsGroups.map((inputsGroup) => (
        <>
          {inputsGroup.map(getInputsGroup)}
          <hr />
        </>
      ))}
    </Form>
  );
};

export default DimensionsInputs;
