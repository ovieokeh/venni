import store from 'src/redux/store'
import { Invite } from 'src/redux/types'
import { newSentInvite } from 'src/redux/actions/invites/invitesActions'

function onNewSentInvite(inviteDetails: Invite) {
  store.dispatch(newSentInvite(inviteDetails))
}

export default onNewSentInvite
