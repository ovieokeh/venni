import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as actions from './invitesActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Invite Actions', () => {
  it('sendFriendInvite should dispatch the right actions when successful', () => {
    mockAxios.put.mockImplementationOnce(() => Promise.resolve({
      data: { message: 'success' },
    }));

    const expectedActions = [];

    const store = mockStore({
      auth: { token: 'token' },
    });

    return store.dispatch(actions.sendFriendInvite(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('unfriendUserRequest should dispatch the right actions when successful', () => {
    mockAxios.delete.mockImplementationOnce(() => Promise.resolve({
      data: { message: 'success' },
    }));

    const expectedActions = [];

    const store = mockStore({
      auth: { token: 'token' },
    });

    return store.dispatch(actions.unfriendUserRequest(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('cancelFriendInvite should dispatch the right actions when successful', () => {
    mockAxios.delete.mockImplementationOnce(() => Promise.resolve());

    const expectedActions = [];

    const store = mockStore({
      auth: { token: 'token' },
    });

    return store.dispatch(actions.cancelFriendInvite(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('friendInviteAction tests', () => {
    it('should dispatch a put when action === accept', () => {
      mockAxios.put.mockImplementationOnce(() => Promise.resolve());

      const expectedActions = [];

      const store = mockStore({
        auth: { token: 'token' },
      });

      return store.dispatch(actions.friendInviteAction(1, 'accept')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch a delete when action === delete', () => {
      mockAxios.delete.mockImplementationOnce(() => Promise.resolve());

      const expectedActions = [];

      const store = mockStore({
        auth: { token: 'token' },
      });

      return store.dispatch(actions.friendInviteAction(1, 'delete')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
