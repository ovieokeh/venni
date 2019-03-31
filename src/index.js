import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { history } from 'utilities';
import Routes from './routes/routes';
import store from './redux/store';

ReactDOM.render((
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
), document.querySelector('#app'));
