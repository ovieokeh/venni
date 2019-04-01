import React from 'react';
import { connect } from 'react-redux';
import NavLink from 'react-router-dom/NavLink';
import propTypes from 'prop-types';
import { Icon } from 'antd';
import './Navbar.scss';

const Navbar = (props) => {
  const { token } = props;

  const renderLinks = () => {
    if (!token) {
      return (
        <span className="menu-item">
          <NavLink to="/login">
            <Icon type="unlock" />
            Login
          </NavLink>
        </span>
      );
    }

    return (
      <span className="menu-item">
        <Icon type="user" />
      </span>
    );
  };

  return (
    <div className="nav">
      <div className="brand">
        <NavLink to="/">
          VENNI
        </NavLink>
      </div>
      <div className="menu-items">
        {renderLinks()}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  token: propTypes.string,
};

Navbar.defaultProps = {
  token: '',
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

const ConnectedNavbar = connect(mapStateToProps)(Navbar);

export default ConnectedNavbar;
