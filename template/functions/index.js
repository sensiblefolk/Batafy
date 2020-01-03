const functions = require('firebase-functions')
const admin = require('firebase-admin')
const request = require('graphql-request')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase)

const client = new request.GraphQLClient('https://batafy.herokuapp.com/v1/graphql', {
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': `${functions.config().batafy.hasurakey}`,
  },
})

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(async user => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }

  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      // Update real-time database to notify client to force refresh.
      const metadataRef = admin.database().ref('metadata/' + user.uid)
      // Store new user details in database
      updateUserDetails(user)
      console.log('jumped in 1')
      // Set the refresh time to the current UTC timestamp.
      // This will be captured on the client to force a token refresh.
      return metadataRef.set({ refreshTime: new Date().getTime() })
    })
    .catch(error => {
      console.log(error)
    })
})

// SYNC WITH HASURA ON USER DELETE
exports.processDelete = functions.auth.user().onDelete(async user => {
  const mutation = `mutation($id: String!) {
      delete_users(where: {id: {_eq: $id}}) {
        affected_rows
      }
  }`
  const id = user.uid
  try {
    const data = await client.request(mutation, {
      id: id,
    })
    return data
  } catch (e) {
    throw new functions.https.HttpsError('sync-failed')
  }
})

async function updateUserDetails(user) {
  const id = user.uid
  const email = user.email
  const name = user.displayName || ''
  const avatar = user.photoURL || ''
  const userRef = admin.database().ref(`users/${user.uid}`)

  if (!name) {
    userRef
      .once('value')
      .then(async userDetails => {
        const value = userDetails.val()

        if (value) {
          await admin.auth().updateUser(id, { displayName: value.name })
          await userMutation(id, email, value.name, avatar)
        }

        return
      })
      .catch(error => {
        throw new Error(error)
      })
  } else {
    await userMutation(id, email, name, avatar)
  }
}

const userMutation = async (id, email, name, avatar) => {
  const mutation = `mutation($id: String!, $email: String, $name: String, $avatar: String!) {
    insert_users(objects: {
      id: $id,
      email: $email,
      name: $name,
      avatar: $avatar
    }) {
      affected_rows
    }
  }`
  try {
    const data = await client.request(mutation, {
      id: id,
      email: email,
      name: name,
      avatar: avatar,
    })

    return data
  } catch (e) {
    throw new functions.https.HttpsError('sync-failed')
  }
}
