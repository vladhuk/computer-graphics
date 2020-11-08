import React, { FunctionComponent } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Header: FunctionComponent = () => (
  <Navbar bg="light">
    <Nav>
      <Nav.Link href={`${process.env.PUBLIC_URL}/#/lab1`}>Lab 1</Nav.Link>
      <Nav.Link href={`${process.env.PUBLIC_URL}/#/lab2`}>Lab 2</Nav.Link>
      <Nav.Link href={`${process.env.PUBLIC_URL}/#/lab3`}>Lab 3</Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;
