import React, { FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import { FormInput } from './Input';
import InputsGroup from './InputsGroup';

interface Props {
  inputsGroups: FormInput[][];
}

const FormTabContent: FunctionComponent<Props> = ({ inputsGroups }) => {
  return (
    <Form className="border border-top-0 rounded p-2 bg-light">
      {inputsGroups.map((inputs, groupIndex) => (
        <>
          <InputsGroup inputs={inputs} />
          {groupIndex !== inputsGroups.length - 1 && <hr />}
        </>
      ))}
    </Form>
  );
};

export default FormTabContent;
