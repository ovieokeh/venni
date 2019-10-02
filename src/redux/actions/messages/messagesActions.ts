import {
  UPDATE_SENT_MESSAGES,
  UPDATE_RECEIVED_MESSAGES,
  Message
} from '../../types'

export const updateSentMessages = (messages: Message[]) => ({
  type: UPDATE_SENT_MESSAGES,
  messages
})

export const updateReceivedMessages = (messages: Message[]) => ({
  type: UPDATE_RECEIVED_MESSAGES,
  messages
})
