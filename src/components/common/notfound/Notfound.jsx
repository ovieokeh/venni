import React from 'react';
import Link from 'react-router-dom/Link';
import './Notfound.scss';

const Notfound = () => (
  <div className="notfound">
    <Link to="/">
      Go Home
    </Link>
  </div>
);

export default Notfound;
