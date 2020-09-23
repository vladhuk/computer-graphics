import React, { FunctionComponent } from 'react';
import Input, { FormInput } from './Input';

interface Props {
  inputs: FormInput[];
}

const InputsGroup: FunctionComponent<Props> = ({ inputs }) => {
  return (
    <>
      {inputs.map(({ title, ...rest }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Input key={title} title={title} {...rest} />
      ))}
    </>
  );
};

export default InputsGroup;
