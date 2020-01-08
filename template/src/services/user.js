import firebase from 'firebase/app'
import { notification } from 'antd'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import dayjs from 'dayjs'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
  databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASEURL}`,
  projectId: 'batafy',
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGESENDERID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENTID}`,
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const provider = new firebase.auth.GoogleAuthProvider()
const firebaseAuth = firebase.auth
let callback = null
let metadataRef = null
let userToken

export default firebaseApp

export async function login(email, password) {
  return firebaseAuth()
    .signInWithEmailAndPassword(email, password)
    .then(() => true)
    .catch(error => {
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

export async function registerEmail(email, name, password) {
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, password)
    .then(async result => {
      await updateProfile(name, result.user)
      return result
    })
    .catch(error => {
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

export async function loginWithGoogle() {
  return firebaseAuth()
    .signInWithPopup(provider)
    .then(result => {
      return result
    })
    .catch(error => {
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

export async function currentAccount() {
  let userLoaded = false
  function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
      if (userLoaded) {
        resolve(firebaseAuth.currentUser)
      }
      const unsubscribe = auth.onAuthStateChanged(async user => {
        userLoaded = true
        userToken = forceTokenRefresh(user)
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }
  return getCurrentUser(firebaseAuth())
}

export async function logout() {
  return firebaseAuth()
    .signOut()
    .then(() => true)
}

const updateProfile = async (name, user) => {
  const { uid, email } = user
  const userRef = firebase.database().ref(`users/${uid}`)
  return userRef
    .set({ name, email })
    .then(() => console.log('user saved successfully'))
    .catch(error => console.log(error))
}

const forceTokenRefresh = async user => {
  if (callback) {
    metadataRef.off('value', callback)
  }
  if (user) {
    const token = await user.getIdToken()
    const idTokenResult = await user.getIdTokenResult()
    const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims']

    if (hasuraClaim) {
      const expiredTime = dayjs(idTokenResult.expirationTime).valueOf()
      const currentTime = dayjs()
        .subtract(1, 'hour')
        .valueOf()
      if (currentTime >= expiredTime) {
        const refreshedToken = user.getIdToken(true)
        console.log('refreshed token', refreshedToken)
        return refreshedToken
      }
      return token
    }

    // Check if refresh is required.
    const refreshUrl = `metadata/${user.uid}/refreshTime`
    metadataRef = firebase.database().ref(refreshUrl)
    callback = snapshot => {
      if (!snapshot) return
      console.log('in 2')
      // Force refresh to pick up the latest custom claims changes.
      // Note this is always triggered on first call. Further optimization could be
      // added to avoid the initial trigger when the token is issued and already contains
      // the latest claimss.
      user.getIdToken(true)
      // console.log('refresh call', idToken)
    }
    // Subscribe new listener to changes on that node.
    metadataRef.on('value', callback)
  }
  return null
}

export function getIdToken() {
  return userToken
}
