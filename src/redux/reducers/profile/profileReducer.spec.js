import profileReducer from './profileReducer';

const initialState = {
  profile: null,
};

describe('loader reducer', () => {
  it('should return the initial state', () => {
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_PROFILE_SUCCESS', () => {
    initialState.profile = 'profile';

    expect(profileReducer(undefined, {
      type: 'GET_PROFILE_SUCCESS',
      payload: 'profile',
    })).toEqual(initialState);
  });
});
