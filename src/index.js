import React from 'react';
import ReactDOM from 'react-dom';
import { history } from 'utilities';
import Routes from './routes/routes';

ReactDOM.render((
  <Routes history={history} />
), document.querySelector('#app'));
