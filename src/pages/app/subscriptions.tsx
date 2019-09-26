import { useEffect } from 'react'
import { IFirebaseContext } from 'src/firebase/interfaces'
import * as socialActions from 'src/redux/actions/social/socialActions'
import store from 'src/redux/store'
import { UserProfile } from 'src/redux/types'

export function useSubscriptions(firebase: IFirebaseContext) {
  const {
    user,
    userFriendsCollection,
    userReceivedInvitesCollection,
    userSentInvitesCollection
  } = firebase

  useEffect(() => {
    if (!user) return

    const unsubscribeFriends = userFriendsCollection
      .doc(user.id)
      .collection('friends')
      .onSnapshot(({ docs }) => {
        const friends: UserProfile[] = []

        if (!docs) {
          return store.dispatch(socialActions.updateFriendList([]))
        }

        if (docs.length) {
          docs.forEach(friend => friends.push(friend.data() as UserProfile))
          store.dispatch(socialActions.updateFriendList(friends))
        }
      })

    const unsubscribeReceivedInvites = userReceivedInvitesCollection
      .doc(user.id)
      .onSnapshot(snap => {
        const data = snap.data()

        if (!data)
          return store.dispatch(socialActions.updateReceivedInvites([]))

        if (Object.keys(data).length) {
          store.dispatch(
            socialActions.updateReceivedInvites([data as UserProfile])
          )
        }
      })

    const unsubscribeSentInvites = userSentInvitesCollection
      .doc(user.id)
      .onSnapshot(snap => {
        const data = snap.data()

        if (!data) {
          return store.dispatch(socialActions.updateSentInvites([]))
        }

        if (Object.keys(data).length) {
          store.dispatch(socialActions.updateSentInvites([data as UserProfile]))
        }
      })

    return () => {
      unsubscribeFriends()
      unsubscribeReceivedInvites()
      unsubscribeSentInvites()
    }
  }, [user])
}
