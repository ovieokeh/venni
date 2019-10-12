import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
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
        const friendIDs = doc.data()
        const batch = db.batch()

        Object.keys(friendIDs as any).forEach(id => {
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
