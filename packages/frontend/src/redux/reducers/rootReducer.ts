import { combineReducers } from 'redux'
import { authReducer } from './authentication/authReducer'

export default combineReducers({
  auth: authReducer
})
