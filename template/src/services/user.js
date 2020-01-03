import firebase from 'firebase/app'
import { notification } from 'antd'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCxDlzHrnsS-FrMUYeXwggJAIFvAX-4IL0',
  authDomain: 'batafy.firebaseapp.com',
  databaseURL: 'https://batafy.firebaseio.com',
  projectId: 'batafy',
  storageBucket: 'batafy.appspot.com',
  messagingSenderId: '64819380692',
  appId: '1:64819380692:web:bfa3c1427b02f3dbbe9641',
  measurementId: 'G-ES9CKV25P6',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const provider = new firebase.auth.GoogleAuthProvider()
const firebaseAuth = firebase.auth
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
      const unsubscribe = auth.onAuthStateChanged(user => {
        userLoaded = true
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
