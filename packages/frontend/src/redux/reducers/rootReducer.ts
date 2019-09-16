import { combineReducers } from 'redux'
import { authReducer } from './authentication/authReducer'
import { profileReducer } from './profile/profileReducer'
import { drawerReducer } from './drawer/drawerReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  drawer: drawerReducer
})
