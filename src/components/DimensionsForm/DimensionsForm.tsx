import React, { FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import Input, { FormInput } from './Input';

interface Props {
  inputsGroups: FormInput[][];
}

const DimensionsForm: FunctionComponent<Props> = ({ inputsGroups }) => {
  return (
    <Form className="border rounded p-2 bg-light">
      {inputsGroups.map((inputs) => (
        <>
          {inputs.map(({ title, value, min, setValue }) => (
            <Input
              key={title}
              title={title}
              value={value}
              min={min}
              setValue={setValue}
            />
          ))}
          <hr />
        </>
      ))}
    </Form>
  );
};

export default DimensionsForm;
