import FirebaseApp from 'firebase/app'

export interface IFirebaseContext {
  auth: FirebaseApp.auth.Auth
  db: FirebaseApp.firestore.Firestore
  createUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>
  loginUser: (
    email: string,
    password: string
  ) => Promise<FirebaseApp.auth.UserCredential>
  logout: () => Promise<void>
}
