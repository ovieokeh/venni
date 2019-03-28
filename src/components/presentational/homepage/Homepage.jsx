import React from 'react';
import Button from 'react-bootstrap/Button';
import illustration from 'assets/homepage_illustration.svg';
import './Homepage.scss';

const Homepage = () => (
  <div className="homepage">
    <div className="illustration-container">
      <img
        className="illustration"
        alt="homepage"
        src={illustration}
      />
    </div>
    <div className="main">
      <h3 className="leading-text">Keeping in touch with friends made easy and fun.</h3>
      <Button variant="outline-success">
        Get Started
      </Button>
    </div>
  </div>
);

export default Homepage;
