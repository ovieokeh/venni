import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as actions from './authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};

describe('auth actions', () => {
  it('should handle LOGIN_SUCCESS', () => {
    expectedAction.type = actions.LOGIN_SUCCESS;
    expectedAction.payload = 'payload';
    expect(actions.loginSuccess('payload')).toEqual(expectedAction);
  });

  it('should handle SIGNUP_SUCCESS', () => {
    expectedAction.type = actions.SIGNUP_SUCCESS;
    expect(actions.signupSuccess('payload')).toEqual(expectedAction);
  });

  it('should handle LOGOUT', () => {
    expectedAction.type = actions.LOGOUT;
    delete expectedAction.payload;

    expect(actions.logoutAction()).toEqual(expectedAction);
  });
});

describe('async auth actions', () => {
  const response = { data: 'token', message: 'passed' };
  const user = {
    email: 'test@example.com',
    password: 'password1',
  };

  it('should dispatch the required actions when loginRequest is successful', () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...response },
    }));

    const expectedActions = [
      { type: 'LOADER_BEGIN' },
      {
        type: actions.LOGIN_SUCCESS,
        payload: response.data,
      },
      { type: 'LOADER_DONE' },
    ];

    const store = mockStore({});
    return store.dispatch(actions.loginRequest(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch the required actions when loginRequest fails', () => {
    const errorResponse = { response: { data: { message: 'failed' } } };
    // eslint-disable-next-line prefer-promise-reject-errors
    mockAxios.post.mockImplementationOnce(() => Promise.reject({
      ...errorResponse,
    }));

    const expectedActions = [
      { type: 'LOADER_BEGIN' },
      { type: 'LOADER_DONE' },
      { type: 'NOTIFY_ERROR', payload: 'failed' },
    ];

    const store = mockStore({});
    return store.dispatch(actions.loginRequest(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch the required actions when signupRequest is successful', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...response },
    }));

    const expectedActions = [
      { type: 'LOADER_BEGIN' },
      {
        type: actions.SIGNUP_SUCCESS,
        payload: response.data,
      },
      { type: 'LOADER_DONE' },
      { type: 'NOTIFY_SUCCESS', payload: 'passed' },
    ];

    const store = mockStore({});

    return store.dispatch(actions.signupRequest(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch the required actions when signupRequest fails', () => {
    const errorResponse = { response: { data: { message: 'failed' } } };
    // eslint-disable-next-line prefer-promise-reject-errors
    mockAxios.post.mockImplementationOnce(() => Promise.reject({
      ...errorResponse,
    }));

    const expectedActions = [
      { type: 'LOADER_BEGIN' },
      { type: 'LOADER_DONE' },
      { type: 'NOTIFY_ERROR', payload: 'failed' },
    ];

    const store = mockStore({});
    return store.dispatch(actions.signupRequest(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
