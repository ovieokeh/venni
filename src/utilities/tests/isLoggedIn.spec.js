import * as actions from 'actions/authentication/authActions';
import store from 'store/store';
import isLoggedIn from '../isLoggedIn';

describe('isLoggedIn', () => {
  it('should return false when a token does not exist', () => {
    expect(isLoggedIn()).toBe(false);
  });

  it('should return true when a token exists', () => {
    store.dispatch(actions.loginSuccess({ token: 'token' })); // login fake user
    expect(isLoggedIn()).toBe(true);
  });
});
