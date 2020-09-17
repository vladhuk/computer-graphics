import React, { FunctionComponent } from 'react';
import Input, { FormInput } from './Input';

interface Props {
  inputs: FormInput[];
}

const InputsGroup: FunctionComponent<Props> = ({ inputs }) => {
  return (
    <>
      {inputs.map(({ title: inputTitle, value, min, unit, setValue }) => (
        <Input
          key={inputTitle}
          title={inputTitle}
          value={value}
          min={min}
          unit={unit}
          setValue={setValue}
        />
      ))}
    </>
  );
};

export default InputsGroup;
