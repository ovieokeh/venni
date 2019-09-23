import store from 'src/redux/store'
import {
  ACCEPTED_SENT_INVITE,
  CANCELED_SENT_INVITE,
  DECLINED_SENT_INVITE,
  UserProfile
} from 'src/redux/types'
import { handledSentInvite } from 'src/redux/actions/social/socialActions'

interface Props {
  inviteId: string
  friend: UserProfile
  action: string
}

function onHandledSentInvite(details: Props) {
  const { action, inviteId, friend } = details
  let payload: any = inviteId
  let type

  switch (action) {
    case 'canceled':
      type = CANCELED_SENT_INVITE
      break

    case 'declined':
      type = DECLINED_SENT_INVITE
      break

    default:
      type = ACCEPTED_SENT_INVITE
      payload = friend
  }

  store.dispatch(handledSentInvite(type, payload))
}

export default onHandledSentInvite
