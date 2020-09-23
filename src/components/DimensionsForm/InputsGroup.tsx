import React, { FunctionComponent } from 'react';
import Input, { FormInput } from './Input';

interface Props {
  inputs: FormInput[];
}

const InputsGroup: FunctionComponent<Props> = ({ inputs }) => {
  return (
    <>
      {inputs.map(({ title, ...rest }) => (
        <Input key={title} title={title} {...rest} />
      ))}
    </>
  );
};

export default InputsGroup;
