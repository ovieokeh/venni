import loaderReducer from './loaderReducer';

const initialState = {
  isLoading: false,
  type: null,
  message: null,
  profileDrawerOpen: false,
};

describe('loader reducer', () => {
  it('should return the initial state', () => {
    expect(loaderReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADER_BEGIN', () => {
    initialState.isLoading = true;

    expect(loaderReducer(initialState, {
      type: 'LOADER_BEGIN',
    })).toEqual(initialState);
  });

  it('should handle LOADER_DONE', () => {
    initialState.isLoading = false;

    expect(loaderReducer(initialState, {
      type: 'LOADER_DONE',
    })).toEqual(initialState);
  });

  it('should handle NOTIFY_ERROR', () => {
    initialState.message = 'error';
    initialState.type = 'error';

    expect(loaderReducer(initialState, {
      type: 'NOTIFY_ERROR',
      payload: 'error',
    })).toEqual(initialState);
  });

  it('should handle NOTIFY_SUCCESS', () => {
    initialState.message = 'success';
    initialState.type = 'success';

    expect(loaderReducer(initialState, {
      type: 'NOTIFY_SUCCESS',
      payload: 'success',
    })).toEqual(initialState);
  });

  it('should handle OPEN_PROFILE_DRAWER', () => {
    initialState.profileDrawerOpen = true;

    expect(loaderReducer(initialState, {
      type: 'OPEN_PROFILE_DRAWER',
    })).toEqual(initialState);
  });

  it('should handle CLOSE_PROFILE_DRAWER', () => {
    initialState.profileDrawerOpen = false;

    expect(loaderReducer(initialState, {
      type: 'CLOSE_PROFILE_DRAWER',
    })).toEqual(initialState);
  });
});
