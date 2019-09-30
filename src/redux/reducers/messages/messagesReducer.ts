import {
  MessageTypes,
  UPDATE_SENT_MESSAGES,
  UPDATE_RECEIVED_MESSAGES,
  MessageState
} from '../../types'

const initialState: MessageState = {
  sentMessages: [],
  receivedMessages: []
}

export function messagesReducer(
  state = initialState,
  action: MessageTypes
): MessageState {
  switch (action.type) {
    case UPDATE_SENT_MESSAGES:
      return {
        ...state,
        sentMessages: action.messages
      }

    case UPDATE_RECEIVED_MESSAGES:
      return {
        ...state,
        receivedMessages: action.messages
      }

    default:
      return state
  }
}
