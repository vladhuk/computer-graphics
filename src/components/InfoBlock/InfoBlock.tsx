import React, { FunctionComponent } from 'react';
import { Form, Row } from 'react-bootstrap';

export interface InfoRecord {
  title: string;
  value: string | number;
  unit?: string;
}

interface Props {
  records: InfoRecord[];
}

const InfoBlock: FunctionComponent<Props> = ({ records }) => {
  return (
    <Form className="border rounded p-2 bg-light">
      {records.map(({ title, value, unit }) => (
        <Form.Group as={Row} key={title}>
          <Form.Label column md={7}>
            {title}
          </Form.Label>
          <Form.Label column md={5}>
            {value} {unit}
          </Form.Label>
        </Form.Group>
      ))}
    </Form>
  );
};

export default InfoBlock;
