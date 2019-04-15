export const LOADER_BEGIN = 'LOADER_BEGIN';
export const LOADER_DONE = 'LOADER_DONE';
export const NOTIFY_ERROR = 'NOTIFY_ERROR';
export const NOTIFY_SUCCESS = 'NOTIFY_SUCCESS';
export const OPEN_PROFILE_DRAWER = 'OPEN_PROFILE_DRAWER';
export const CLOSE_PROFILE_DRAWER = 'CLOSE_PROFILE_DRAWER';

export const loaderBegin = () => ({ type: LOADER_BEGIN });
export const loaderDone = () => ({ type: LOADER_DONE });
export const openProfileDrawer = () => ({ type: OPEN_PROFILE_DRAWER });
export const closeProfileDrawer = () => ({ type: CLOSE_PROFILE_DRAWER });

export const notifyError = error => ({
  type: NOTIFY_ERROR,
  payload: error,
});
export const notifySuccess = message => ({
  type: NOTIFY_SUCCESS,
  payload: message,
});
