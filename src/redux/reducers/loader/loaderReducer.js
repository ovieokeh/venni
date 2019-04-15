import {
  LOADER_BEGIN, LOADER_DONE, NOTIFY_ERROR,
  NOTIFY_SUCCESS, OPEN_PROFILE_DRAWER, CLOSE_PROFILE_DRAWER,
} from 'actions/loader/loaderActions';

const initialState = {
  isLoading: false,
  type: null,
  message: null,
  profileDrawerOpen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER_BEGIN:
      return {
        ...state,
        isLoading: true,
        type: null,
        message: null,
      };

    case LOADER_DONE:
      return {
        ...state,
        isLoading: false,
      };

    case NOTIFY_ERROR:
      return {
        ...state,
        type: 'error',
        message: action.payload,
      };

    case NOTIFY_SUCCESS:
      return {
        ...state,
        type: 'success',
        message: action.payload,
      };

    case OPEN_PROFILE_DRAWER:
      return {
        ...state,
        profileDrawerOpen: true,
      };

    case CLOSE_PROFILE_DRAWER:
      return {
        ...state,
        profileDrawerOpen: false,
      };

    default:
      return state;
  }
};

export default reducer;
