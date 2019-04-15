import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import mockup from 'assets/homepage-mockup.svg';
import { Logo } from 'components/common';
import './Homepage.less';

function Homepage() {
  window.document.title = 'Venni';

  return (
    <div className="homepage">
      <div className="image-container">
        <img
          className="image"
          alt="homepage"
          src={mockup}
        />
      </div>
      <div className="main">
        <Logo fill="white" />
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
