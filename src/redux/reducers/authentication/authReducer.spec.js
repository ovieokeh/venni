import authReducer from './authReducer';

const initialState = {
  token: null,
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SIGNUP_SUCCESS', () => {
    initialState.token = 'token';

    expect(authReducer(initialState, {
      type: 'SIGNUP_SUCCESS',
      payload: 'token',
    })).toEqual(initialState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: 'LOGIN_SUCCESS',
      payload: 'token',
    })).toEqual(initialState);
  });

  it('should handle LOGOUT', () => {
    initialState.token = null;

    expect(authReducer(initialState, {
      type: 'LOGOUT',
    })).toEqual(initialState);
  });
});
