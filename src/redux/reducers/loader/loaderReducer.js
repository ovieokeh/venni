import {
  LOADER_BEGIN, LOADER_DONE,
  NOTIFY_ERROR, NOTIFY_SUCCESS,
} from 'actions/loader/loaderActions';

const initialState = {
  isLoading: false,
  type: null,
  message: null,
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

    default:
      return state;
  }
};

export default reducer;
