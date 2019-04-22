import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import { Icon, Badge } from 'antd';
import { openProfileDrawer } from 'actions/loader/loaderActions';
import './Navbar.less';

function Navbar({ user, openProfile }) {
  const { profile } = user;

  const renderLinks = () => {
    if (!profile) {
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
        <div
          className="toggler"
          onClick={() => openProfile()}
        >
          {
            user.friendInvites.length
              ? (
                <Badge status="error" offset={[-15, 5]}>
                  <img
                    src={profile.avatarUrl}
                    alt="user"
                    className="user-picture image-30"
                  />
                </Badge>
              )
              : (
                <img
                  src={profile.avatarUrl}
                  alt="user"
                  className="user-picture image-30"
                />
              )
          }
        </div>
      </span>
    );
  };

  return (
    <div className="nav">
      <div className="brand">
        <NavLink className="brand-link" to="/">
          VENNI
        </NavLink>
      </div>
      <div className="menu-items">
        {renderLinks()}
      </div>
    </div>
  );
}

Navbar.propTypes = {
  user: propTypes.instanceOf(Object),
  openProfile: propTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  openProfile: () => dispatch(openProfileDrawer()),
});

const ConnectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default ConnectedNavbar;
