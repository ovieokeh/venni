import React from 'react';
import Link from 'react-router-dom/Link';
import Image from 'assets/404.svg';
import './Notfound.scss';

const Notfound = () => (
  <div className="notfound">
    <img alt="404" src={Image} />
    <div className="main">
      <h3>Page Not Found</h3>
      <p>The page you&#39;re looking for doesn&#39;t exist or some other error occurred.</p>
      <Link to="/">
        Go to the Homepage
      </Link>
    </div>
  </div>
);

export default Notfound;
