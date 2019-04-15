import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { GET_PROFILE_SUCCESS } from 'actions/profile/profileActions';
import * as actions from './requestsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Request Actions', () => {
  it('sendFriendRequest should dispatch the right actions when successful', () => {
    mockAxios.put.mockImplementationOnce(() => Promise.resolve());

    const expectedActions = [{
      type: GET_PROFILE_SUCCESS,
      payload: undefined,
    }];

    const store = mockStore({
      auth: { token: 'token' },
    });

    return store.dispatch(actions.sendFriendRequest(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('unfriendUserRequest should dispatch the right actions when successful', () => {
    mockAxios.delete.mockImplementationOnce(() => Promise.resolve());

    const expectedActions = [{
      type: GET_PROFILE_SUCCESS,
      payload: undefined,
    }];

    const store = mockStore({
      auth: { token: 'token' },
    });

    return store.dispatch(actions.unfriendUserRequest(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('cancelFriendRequest should dispatch the right actions when successful', () => {
    mockAxios.delete.mockImplementationOnce(() => Promise.resolve());

    const expectedActions = [{
      type: GET_PROFILE_SUCCESS,
      payload: undefined,
    }];

    const store = mockStore({
      auth: { token: 'token' },
    });

    return store.dispatch(actions.cancelFriendRequest(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('friendRequestAction tests', () => {
    it('should dispatch a put when action === accept', () => {
      mockAxios.put.mockImplementationOnce(() => Promise.resolve());

      const expectedActions = [{
        type: GET_PROFILE_SUCCESS,
        payload: undefined,
      }];

      const store = mockStore({
        auth: { token: 'token' },
      });

      return store.dispatch(actions.friendRequestAction(1, 'accept')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch a delete when action === delete', () => {
      mockAxios.delete.mockImplementationOnce(() => Promise.resolve());

      const expectedActions = [{
        type: GET_PROFILE_SUCCESS,
        payload: undefined,
      }];

      const store = mockStore({
        auth: { token: 'token' },
      });

      return store.dispatch(actions.friendRequestAction(1, 'delete')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
