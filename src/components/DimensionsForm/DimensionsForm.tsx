import React, { FunctionComponent } from 'react';
import { AccordionCollapse, Tab, Tabs } from 'react-bootstrap';
import FormTabContent from './FormTabContent';
import { FormInput } from './Input';

export interface FormTab {
  title: string;
  inputsGroups: FormInput[][];
}

interface Props {
  tabs: FormTab[];
  onSelect?: (tabName: string | null) => void;
}

const DimensionsForm: FunctionComponent<Props> = ({ tabs, onSelect }) => {
  return (
    <div className="col-3">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Tabs transition={AccordionCollapse as any} onSelect={onSelect}>
        {tabs.map(({ title, inputsGroups }) => (
          <Tab key={title} eventKey={title} title={title}>
            <FormTabContent key={title} inputsGroups={inputsGroups} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default DimensionsForm;
