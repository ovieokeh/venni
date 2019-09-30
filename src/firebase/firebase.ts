import React from 'react'
import FirebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { firebaseConfig } from './config'
import { FirebaseCtx } from './interfaces'
import reduxStore from 'src/redux/store'
import { getProfileSuccess } from 'src/redux/actions/profile/profileActions'
import { history } from 'src/utilities/history'
import { UserProfile } from 'src/redux/types'

class Firebase implements FirebaseCtx {
  user: null | UserProfile
  auth: FirebaseApp.auth.Auth
  db: FirebaseApp.firestore.Firestore
  usersCollection: FirebaseApp.firestore.CollectionReference
  userSentInvitesCollection: FirebaseApp.firestore.CollectionReference
  userReceivedInvitesCollection: FirebaseApp.firestore.CollectionReference
  userFriendsCollection: FirebaseApp.firestore.CollectionReference
  userMessagesCollection: FirebaseApp.firestore.CollectionReference

  constructor() {
    if (!FirebaseApp.apps.length) {
      FirebaseApp.initializeApp(firebaseConfig)
      FirebaseApp.firestore()
        .enablePersistence({ synchronizeTabs: true })
        .catch(err => console.log(err))
    }

    this.user = null
    this.auth = FirebaseApp.auth()
    this.db = FirebaseApp.firestore()

    this.usersCollection = this.db.collection('users')
    this.userSentInvitesCollection = this.db.collection('userSentInvites')
    this.userReceivedInvitesCollection = this.db.collection(
      'userReceivedInvites'
    )
    this.userFriendsCollection = this.db.collection('userFriends')
    this.userMessagesCollection = this.db.collection('userMessages')

    this.auth.onAuthStateChanged(async user => {
      if (!user) return

      const userDetails = await this.getUserDetails(user.uid)
      this.user = userDetails

      reduxStore.dispatch(getProfileSuccess(userDetails))
      history.push('/')
    })
  }

  createUser = async (name: string, email: string, password: string) => {
    const { user } = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )
    if (!user) return

    const batch = this.db.batch()

    const userDoc = this.usersCollection.doc(user.uid)

    batch.set(userDoc, {
      id: user.uid,
      name,
      email,
      avatar: process.env.REACT_APP_DEFAULT_USER_PHOTO,
      createdAt: new Date()
    })

    const userFriendsDoc = this.db.collection('userFriends').doc(user.uid)

    batch.set(userFriendsDoc, {})

    // init fields on db
    ;['userSentInvites', 'userReceivedInvites'].forEach(col => {
      const ref = this.db.collection(col).doc(user.uid)
      batch.set(ref, {})
    })

    await batch.commit()
  }

  loginUser = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password)

  findUserByEmail = async (email: string): Promise<null | UserProfile> => {
    const users = await this.usersCollection
      .where('email', '==', email)
      .limit(1)
      .get()

    if (!users) return null

    let user: null | UserProfile = null

    users.forEach(result => {
      user = { id: result.id, ...result.data() } as UserProfile
    })

    return user
  }

  getUserDetails = async (id: string): Promise<UserProfile> => {
    const response = await this.usersCollection.doc(id).get()

    const userDetails: UserProfile = {
      id,
      ...(response.data() as {
        name: string
        email: string
        avatar: string
        createdAt: Date
      })
    }

    return userDetails
  }

  sendFriendInvite = async (email: string) => {
    const friend = await this.findUserByEmail(email)
    if (!friend) throw new Error('No user with this email address')

    if (friend.id === (this.user as UserProfile).id) {
      throw new Error('You cannot send yourself a friend request')
    }

    const isAlreadyFriend = await this.userFriendsCollection
      .doc((this.user as UserProfile).id)
      .collection('friends')
      .where('email', '==', email)
      .limit(1)
      .get()

    isAlreadyFriend.forEach(res => {
      if (res.exists) throw new Error(email + ' is already your friend')
    })

    const batch = this.db.batch()

    const addToSentInvites = this.db
      .collection('userSentInvites')
      .doc((this.user as UserProfile).id)
      .collection('sentInvites')
      .doc((friend as UserProfile).id)

    batch.set(addToSentInvites, {
      ...(friend as UserProfile)
    })

    const addToReceivedInvites = this.db
      .collection('userReceivedInvites')
      .doc((friend as UserProfile).id)
      .collection('receivedInvites')
      .doc((this.user as UserProfile).id)

    batch.set(addToReceivedInvites, {
      ...(this.user as UserProfile)
    })

    await batch.commit()
  }

  cancelSentInvite = async (id: string) => {
    const batch = this.db.batch()

    const inviteFromUser = this.db
      .collection('userSentInvites')
      .doc((this.user as UserProfile).id)
      .collection('sentInvites')
      .doc(id)

    batch.delete(inviteFromUser)

    const inviteToFriend = this.db
      .collection('userReceivedInvites')
      .doc(id)
      .collection('receivedInvites')
      .doc((this.user as UserProfile).id)

    batch.delete(inviteToFriend)

    await batch.commit()
  }

  respondToReceivedInvite = async (
    action: 'accept' | 'decline',
    email: string
  ) => {
    const friend = await this.findUserByEmail(email)
    if (!friend) throw new Error('No user with the email:' + email)

    const batch = this.db.batch()

    if (action === 'accept') {
      const addFriendToUserRef = this.db
        .collection('userFriends')
        .doc((this.user as UserProfile).id)
        .collection('friends')
        .doc((friend as UserProfile).id)

      batch.set(addFriendToUserRef, {
        ...(friend as UserProfile)
      })

      const addUserToFriendRef = this.db
        .collection('userFriends')
        .doc((friend as UserProfile).id)
        .collection('friends')
        .doc((this.user as UserProfile).id)

      batch.set(addUserToFriendRef, {
        ...(this.user as UserProfile)
      })
    }

    const receivedInviteRef = this.db
      .collection('userReceivedInvites')
      .doc((this.user as UserProfile).id)
      .collection('receivedInvites')
      .doc((friend as UserProfile).id)

    batch.delete(receivedInviteRef)

    const sentInviteRef = this.db
      .collection('userSentInvites')
      .doc((friend as UserProfile).id)
      .collection('sentInvites')
      .doc((this.user as UserProfile).id)

    batch.delete(sentInviteRef)

    await batch.commit()
  }

  unfriend = async (id: string) => {
    const batch = this.db.batch()

    const userFriend = this.db
      .collection('userFriends')
      .doc((this.user as UserProfile).id)
      .collection('friends')
      .doc(id)

    batch.delete(userFriend)

    const friendUser = this.db
      .collection('userFriends')
      .doc(id)
      .collection('friends')
      .doc((this.user as UserProfile).id)

    batch.delete(friendUser)

    await batch.commit()
  }

  sendMessage = async (id: string, message: string) => {
    const timestamp = Date.now()

    await this.db.collection('userMessages').add({
      sender: (this.user as UserProfile).id,
      receiver: id,
      message,
      timestamp
    })
  }

  logout = () => this.auth.signOut()
}

const FirebaseContext = React.createContext<FirebaseCtx | null>(null)

export { Firebase, FirebaseContext, FirebaseApp }
