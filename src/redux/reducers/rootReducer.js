import { combineReducers } from 'redux';
import authReducer from './authentication/authReducer';
import loaderReducer from './loader/loaderReducer';

export default combineReducers({
  auth: authReducer,
  loader: loaderReducer,
});
