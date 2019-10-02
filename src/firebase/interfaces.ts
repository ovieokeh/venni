import FirebaseApp from 'firebase/app'
import { UserProfile } from 'src/redux/types'

export interface FirebaseCtx {
  user: null | UserProfile
  auth: FirebaseApp.auth.Auth
  db: FirebaseApp.firestore.Firestore

  // collections
  userSentInvitesCollection: FirebaseApp.firestore.CollectionReference
  userReceivedInvitesCollection: FirebaseApp.firestore.CollectionReference
  userFriendsCollection: FirebaseApp.firestore.CollectionReference
  userMessagesCollection: FirebaseApp.firestore.CollectionReference

  // methods
  createUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void | undefined>
  loginUser: (
    email: string,
    password: string
  ) => Promise<FirebaseApp.auth.UserCredential>
  sendFriendInvite: (email: string) => Promise<void>
  cancelSentInvite: (id: string) => Promise<void>
  respondToReceivedInvite: (
    action: 'accept' | 'decline',
    email: string
  ) => Promise<void>
  unfriend: (id: string) => Promise<void>
  sendMessage: (id: string, message: string) => Promise<void>
  markMessageAsRead: (timestamp: number) => Promise<void>
  logout: () => Promise<void>
}
