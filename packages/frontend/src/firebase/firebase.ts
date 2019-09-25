import React from 'react'
import FirebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { firebaseConfig } from './config'
import { IFirebaseContext } from './interfaces'
import reduxStore from 'src/redux/store'
import { getProfileSuccess } from 'src/redux/actions/profile/profileActions'
import { history } from 'src/cores/history'
import { UserProfile } from 'src/redux/types'

class Firebase implements IFirebaseContext {
  auth: FirebaseApp.auth.Auth
  db: FirebaseApp.firestore.Firestore

  constructor() {
    !FirebaseApp.apps.length && FirebaseApp.initializeApp(firebaseConfig)
    this.auth = FirebaseApp.auth()
    this.db = FirebaseApp.firestore()

    this.auth.onAuthStateChanged(async user => {
      if (!user) return

      const userDetails = await this.getUserDetails(user.uid)
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

    return this.db
      .collection('users')
      .doc(user.uid)
      .set({
        name,
        email,
        avatar: process.env.REACT_APP_DEFAULT_USER_PHOTO,
        createdAt: new Date()
      })
  }

  loginUser = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password)

  getUserDetails = async (id: string): Promise<UserProfile> => {
    const response = await this.db
      .collection('users')
      .doc(id)
      .get()

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

  logout = () => this.auth.signOut()
}

const FirebaseContext = React.createContext<IFirebaseContext | null>(null)

export { Firebase, FirebaseContext, FirebaseApp }
