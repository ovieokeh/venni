import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import phone from 'assets/phone.png';
import logo from 'assets/logo.svg';
import './Homepage.less';

function Homepage() {
  window.document.title = 'Venni';

  return (
    <div className="homepage">
      <div className="image-container">
        <img
          className="image"
          alt="homepage"
          src={phone}
        />
      </div>
      <div className="main">
        <img alt="logo" src={logo} />
        <h2>Free Messaging Whenever, Wherever</h2>
        <h3>Keeping in touch with friends made easy and fun.</h3>
        <p>
          Send free one-on-one and group texts to
          <br />
          {' '}
          your friends anytime, anywhere!
        </p>
        <Link
          className="get-started"
          to="/signup"
        >
          <Icon type="rocket" />
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
