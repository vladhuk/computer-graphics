import React, { FunctionComponent, useState } from 'react';
import { Collapse, Form, Row } from 'react-bootstrap';
import LineCollapse from '../LineCollapse';

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
      <LineCollapse>
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
      </LineCollapse>
    </Form>
  );
};

export default InfoBlock;
