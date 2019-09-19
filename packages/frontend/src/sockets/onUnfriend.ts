import store from 'src/redux/store'
import { unfriend } from 'src/redux/actions/invites/invitesActions'

function onUnfriend(friendId: string) {
  store.dispatch(unfriend(friendId))
}

export default onUnfriend
