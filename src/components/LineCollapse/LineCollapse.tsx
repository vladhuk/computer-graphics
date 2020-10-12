import React, { FunctionComponent, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import './LineCollapse.css';

interface Props {
  defaultDisplay?: boolean;
}

const LineCollapse: FunctionComponent<Props> = ({
  children,
  defaultDisplay,
}) => {
  const [display, setDisplay] = useState(
    defaultDisplay === undefined ? true : defaultDisplay
  );

  return (
    <div>
      <div className="d-flex">
        <hr className="col-10 mx-auto" />
        <button
          type="button"
          onClick={() => setDisplay(!display)}
          className="collapse-button border rounded-circle my-auto"
          aria-label="Collapse"
        />
      </div>
      <Collapse in={display}>
        <div>{children}</div>
      </Collapse>
    </div>
  );
};

export default LineCollapse;
