import { combineReducers } from 'redux'
import { profileReducer } from './profile/profileReducer'
import { drawerReducer } from './drawer/drawerReducer'
import { socialReducer } from './social/socialReducer'
import { messagesReducer } from './messages/messagesReducer'

export default combineReducers({
  profile: profileReducer,
  drawer: drawerReducer,
  social: socialReducer,
  messages: messagesReducer
})
