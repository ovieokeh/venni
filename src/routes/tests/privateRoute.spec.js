import React from 'react';
import { shallow } from 'enzyme';
import * as actions from 'actions/authentication/authActions';
import PrivateRoute from '../privateRoute';
import store from '../../redux/store';

describe('PrivateRoute tests', () => {
  const PrivateComponent = () => <div>Smurfs</div>;

  it('does not render the component when the user is logged out', () => {
    const wrapper = shallow(
      <PrivateRoute path="/private" component={PrivateComponent} />,
    );

    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  it('redirects when the user is logged in', () => {
    store.dispatch(actions.loginSuccess({ token: 'token' })); // login fake user
    const wrapper = shallow(
      <PrivateRoute path="/private" component={PrivateComponent} />,
    );

    expect(wrapper.find('Redirect').exists()).toBe(false);
  });
});
