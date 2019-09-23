import store from 'src/redux/store'
import {
  ACCEPTED_RECEIVED_INVITE,
  CANCELED_RECEIVED_INVITE,
  DECLINED_RECEIVED_INVITE,
  UserProfile
} from 'src/redux/types'
import { handledInvite } from 'src/redux/actions/social/socialActions'

interface Props {
  inviteId: string
  friend: UserProfile
  action: string
}

function onHandledReceivedInvite(details: Props) {
  const { action, inviteId, friend } = details
  let payload: any = inviteId
  let type

  console.log(details, 'received')
  switch (action) {
    case 'canceled':
      type = CANCELED_RECEIVED_INVITE
      break

    case 'declined':
      type = DECLINED_RECEIVED_INVITE
      break

    default:
      type = ACCEPTED_RECEIVED_INVITE
      payload = friend
  }

  store.dispatch(handledInvite(type, payload))
}

export default onHandledReceivedInvite
