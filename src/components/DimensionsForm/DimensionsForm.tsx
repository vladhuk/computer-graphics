import React, { FunctionComponent } from 'react';
import { AccordionCollapse, Form, Tab, Tabs } from 'react-bootstrap';
import Input, { FormInput } from './Input';

interface ITab {
  title: string;
  inputsGroups: FormInput[][];
}

interface Props {
  tabs: ITab[];
}

const DimensionsForm: FunctionComponent<Props> = ({ tabs }) => {
  return (
    <div className="col-3">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Tabs transition={AccordionCollapse as any}>
        {tabs.map(({ title: tabTitle, inputsGroups }) => (
          <Tab key={tabTitle} eventKey={tabTitle} title={tabTitle}>
            <Form className="border border-top-0 rounded p-2 bg-light">
              {inputsGroups.map((inputs, groupIndex) => (
                <>
                  {inputs.map(({ title: inputTitle, value, min, setValue }) => (
                    <Input
                      key={inputTitle}
                      title={inputTitle}
                      value={value}
                      min={min}
                      setValue={setValue}
                    />
                  ))}
                  {groupIndex !== inputsGroups.length - 1 && <hr />}
                </>
              ))}
            </Form>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default DimensionsForm;
