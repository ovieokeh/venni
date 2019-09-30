import { useEffect } from 'react'
import { FirebaseCtx } from 'src/firebase/interfaces'
import * as socialActions from 'src/redux/actions/social/socialActions'
import store from 'src/redux/store'
import { UserProfile, Message } from 'src/redux/types'

export function useSubscriptions(firebase: FirebaseCtx) {
  const {
    user,
    userFriendsCollection,
    userReceivedInvitesCollection,
    userSentInvitesCollection,
    userMessagesCollection
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

        docs.forEach(friend => friends.push(friend.data() as UserProfile))
        store.dispatch(socialActions.updateFriendList(friends))
      })

    const unsubscribeReceivedInvites = userReceivedInvitesCollection
      .doc(user.id)
      .collection('receivedInvites')
      .onSnapshot(({ docs }) => {
        const receivedInvites: UserProfile[] = []

        if (!docs)
          return store.dispatch(socialActions.updateReceivedInvites([]))

        docs.forEach(invite =>
          receivedInvites.push(invite.data() as UserProfile)
        )
        store.dispatch(socialActions.updateReceivedInvites(receivedInvites))
      })

    const unsubscribeSentInvites = userSentInvitesCollection
      .doc(user.id)
      .collection('sentInvites')
      .onSnapshot(({ docs }) => {
        const sentInvites: UserProfile[] = []

        if (!docs) {
          return store.dispatch(socialActions.updateSentInvites([]))
        }

        docs.forEach(invite => sentInvites.push(invite.data() as UserProfile))
        store.dispatch(socialActions.updateSentInvites(sentInvites))
      })

    const unsubscribeReceivedMessages = userMessagesCollection
      .where('receiver', '==', user.id)
      .onSnapshot(({ docs }) => {
        if (!docs) {
          return store.dispatch(socialActions.updateReceivedMessages([]))
        }

        const messages: Message[] = []

        docs.forEach(message => {
          messages.push(message.data() as Message)
        })

        store.dispatch(socialActions.updateReceivedMessages(messages))
      })

    const unsubscribeSentMessages = userMessagesCollection
      .where('sender', '==', user.id)
      .onSnapshot(({ docs }) => {
        if (!docs) {
          return store.dispatch(socialActions.updateSentMessages([]))
        }

        const messages: Message[] = []

        docs.forEach(message => {
          messages.push(message.data() as Message)
        })

        store.dispatch(socialActions.updateSentMessages(messages))
      })

    return () => {
      unsubscribeFriends()
      unsubscribeReceivedInvites()
      unsubscribeSentInvites()
      unsubscribeSentMessages()
      unsubscribeReceivedMessages()
    }
  }, [
    user,
    userFriendsCollection,
    userReceivedInvitesCollection,
    userSentInvitesCollection,
    userMessagesCollection
  ])
}
