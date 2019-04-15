import React from 'react';
import { shallow } from 'enzyme';
import * as actions from 'actions/authentication/authActions';
import store from 'store/store';
import PublicRoute from '../publicRoute';

describe('PublicRoute tests', () => {
  const PublicComponent = () => <div>Smurfs</div>;

  it('renders the component when the user is logged out', () => {
    const wrapper = shallow(
      <PublicRoute path="/public" component={PublicComponent} />,
    );

    expect(wrapper.find('Route').exists()).toBe(true);
  });

  it('redirects when the user is logged in', () => {
    store.dispatch(actions.loginSuccess({ token: 'token' })); // login fake user
    const wrapper = shallow(
      <PublicRoute path="/public" component={PublicComponent} />,
    );

    expect(wrapper.find('Redirect').exists()).toBe(true);
  });
});
