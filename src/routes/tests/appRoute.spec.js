import React from 'react';
import { shallow } from 'enzyme';
import * as actions from 'actions/authentication/authActions';
import store from 'store/store';
import AppRoute from '../appRoute';

describe('AppRoute tests', () => {
  const AppComponent = () => <div>Smurfs</div>;

  it('does not render the component when the user is logged out', () => {
    const wrapper = shallow(
      <AppRoute path="/app" component={AppComponent} />,
    );

    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  it('redirects when the user is logged in', () => {
    store.dispatch(actions.loginSuccess({ token: 'token' })); // login fake user

    const wrapper = shallow(
      <AppRoute path="/app" component={AppComponent} />,
    );

    expect(wrapper.find('Redirect').exists()).toBe(false);
  });
});
