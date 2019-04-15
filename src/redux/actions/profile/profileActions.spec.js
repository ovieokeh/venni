import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as actions from './profileActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Profile Actions', () => {
  const expectedAction = {};

  it('should handle GET_PROFILE_SUCCESS', () => {
    const payload = { profile: 'of me' };
    expectedAction.type = actions.GET_PROFILE_SUCCESS;
    expectedAction.payload = payload;

    expect(actions.getProfileSuccess(payload)).toEqual(expectedAction);
  });

  describe('async profile actions', () => {
    const profile = {
      id: Math.random(),
      name: 'Test Example',
      email: 'test@example.com',
    };
    const response = {
      data: profile,
    };

    it('should dispatch the required actions when getProfileSuccess is successful', () => {
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        data: { ...response },
      }));

      const expectedActions = [{
        type: actions.GET_PROFILE_SUCCESS,
        payload: response.data,
      }];

      const store = mockStore({
        auth: { token: 'token' },
      });

      return store.dispatch(actions.getProfileRequest()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
