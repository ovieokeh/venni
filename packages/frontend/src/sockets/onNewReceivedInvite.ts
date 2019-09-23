import store from 'src/redux/store'
import { Invite } from 'src/redux/types'
import { newFriendInvite } from 'src/redux/actions/social/socialActions'

function onNewReceivedInvite(inviteDetails: Invite) {
  store.dispatch(newFriendInvite(inviteDetails))
}

export default onNewReceivedInvite
