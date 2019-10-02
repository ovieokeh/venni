import {
  NotificationTypes,
  NEW_FRIEND_NOTIFICATION,
  READ_NOTIFICATION,
  NotificationState
} from '../../types'

const initialState: NotificationState = {
  notifications: {}
}

export function notificationReducer(
  state = initialState,
  action: NotificationTypes
): NotificationState {
  switch (action.type) {
    case NEW_FRIEND_NOTIFICATION:
      return {
        notifications: {
          ...state.notifications,
          [action.friendId]: true
        }
      }

    case READ_NOTIFICATION:
      return {
        notifications: {
          ...state.notifications,
          [action.friendId]: false
        }
      }

    default:
      return state
  }
}
