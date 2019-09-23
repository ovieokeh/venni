import store from 'src/redux/store'
import { unfriend } from 'src/redux/actions/social/socialActions'

function onUnfriend(friendId: string) {
  store.dispatch(unfriend(friendId))
}

export default onUnfriend
