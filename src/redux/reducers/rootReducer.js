import { combineReducers } from 'redux';
import authReducer from './authentication/authReducer';
import loaderReducer from './loader/loaderReducer';
import profileReducer from './profile/profileReducer';

export default combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  user: profileReducer,
});
