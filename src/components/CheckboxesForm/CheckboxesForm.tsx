import React, { FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import LineCollapse from '../LineCollapse';
import Checkbox, { FormCheckbox } from './Checkbox';

interface Props {
  checkboxes: FormCheckbox[];
}

const DimensionsForm: FunctionComponent<Props> = ({ checkboxes }) => {
  return (
    <Form className="border rounded p-2 bg-light">
      <LineCollapse>
        {checkboxes.map((checkbox) => (
          <Checkbox {...checkbox} />
        ))}
      </LineCollapse>
    </Form>
  );
};

export default DimensionsForm;
