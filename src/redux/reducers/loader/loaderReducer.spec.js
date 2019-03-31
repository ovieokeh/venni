import loaderReducer from './loaderReducer';

const initialState = {
  isLoading: false,
  type: null,
  message: null,
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
});
