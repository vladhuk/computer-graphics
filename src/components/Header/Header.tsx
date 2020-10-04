import React, { FunctionComponent } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Header: FunctionComponent = () => (
  <Navbar bg="light">
    <Nav>
      <Nav.Link href="/lab1">Lab 1</Nav.Link>
      <Nav.Link href="/lab2">Lab 2</Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;
