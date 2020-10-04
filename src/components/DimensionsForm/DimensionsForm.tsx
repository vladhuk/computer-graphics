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
  defaultTab?: string;
  onSelect?: (tabName: string | null) => void;
}

const DimensionsForm: FunctionComponent<Props> = ({
  tabs,
  defaultTab,
  onSelect,
}) => {
  return (
    <div className="col-3">
      {/* eslint-disable-next-line */}
      <Tabs transition={AccordionCollapse as any}
        onSelect={onSelect}
        defaultActiveKey={defaultTab}
        className="border rounded-top justify-content-around"
      >
        {tabs.map(({ title, inputsGroups }) => (
          <Tab
            key={title}
            eventKey={title}
            title={title}
            tabClassName="border rounded my-1"
          >
            <FormTabContent key={title} inputsGroups={inputsGroups} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default DimensionsForm;
