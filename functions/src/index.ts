import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { FieldValue } from '@google-cloud/firestore'
admin.initializeApp()

const db = admin.firestore()

export const updateProfileDetails = functions.firestore
  .document('/users/{userId}')
  .onUpdate((change, ctx) => {
    const newData = change.after.data()
    const prevData = change.before.data()

    if (JSON.stringify(newData) === JSON.stringify(prevData)) return null

    return db
      .collection('userFriendsLookup')
      .doc(ctx.params.userId)
      .get()
      .then(doc => {
        const friendIDs = (doc.data() as any).friends as string[]
        const batch = db.batch()

        friendIDs.forEach(id => {
          batch.update(
            db
              .collection('userFriends')
              .doc(id)
              .collection('friends')
              .doc(ctx.params.userId),
            { ...newData }
          )
        })

        return batch.commit()
      })
  })

export const addToLookup = functions.firestore
  .document('/userFriends/{userId}/friends/{friendId}')
  .onCreate((_, ctx) => {
    return db
      .collection('userFriendsLookup')
      .doc(ctx.params.userId)
      .update({ friends: FieldValue.arrayUnion(ctx.params.friendId) })
  })

export const removeFromLookup = functions.firestore
  .document('/userFriends/{userId}/friends/{friendId}')
  .onDelete((_, ctx) => {
    return db
      .collection('userFriendsLookup')
      .doc(ctx.params.userId)
      .update({ friends: FieldValue.arrayRemove(ctx.params.friendId) })
  })
