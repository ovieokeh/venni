import FirebaseApp from 'firebase/app'
import { UserProfile } from 'src/redux/types'

export interface IFirebaseContext {
  user: null | UserProfile
  auth: FirebaseApp.auth.Auth
  db: FirebaseApp.firestore.Firestore

  // collections
  userSentInvitesCollection: FirebaseApp.firestore.CollectionReference
  userReceivedInvitesCollection: FirebaseApp.firestore.CollectionReference
  userFriendsCollection: FirebaseApp.firestore.CollectionReference

  // methods
  createUser: (name: string, email: string, password: string) => Promise<void>
  loginUser: (
    email: string,
    password: string
  ) => Promise<FirebaseApp.auth.UserCredential>
  sendFriendInvite: (email: string) => Promise<boolean>
  respondToReceivedInvite: (
    action: 'accept' | 'decline',
    email: string
  ) => Promise<boolean>
  logout: () => Promise<void>
}
