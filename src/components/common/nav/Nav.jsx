import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import User from 'react-feather/dist/icons/user';
import './Nav.scss';

const Nav = () => (
  <Navbar className="navi" bg="light">
    <Navbar.Brand>
      <NavLink className="navi-brand" to="/">
        VENNI
      </NavLink>
    </Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
      <Button variant="light">
        <User />
        <span>
          Sign In
        </span>
      </Button>
    </Navbar.Collapse>
  </Navbar>
);

export default Nav;
