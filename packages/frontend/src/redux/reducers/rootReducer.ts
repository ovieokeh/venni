import { combineReducers } from 'redux'
import { authReducer } from './authentication/authReducer'
import { profileReducer } from './profile/profileReducer'
import { drawerReducer } from './drawer/drawerReducer'
import { socialReducer } from './social/socialReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  drawer: drawerReducer,
  social: socialReducer
})
