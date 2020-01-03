import { all, takeEvery, takeLatest, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import { login, loginWithGoogle, currentAccount, registerEmail, logout } from 'services/user'
import actions from './actions'

export function* LOGIN({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(login, email, password)
  yield put({
    type: 'user/LOAD_CURRENT_ACCOUNT',
  })
  if (success) {
    yield history.push('/')
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in to Batafy',
    })
  }
}

export function* LOGIN_WITH_GOOGLE() {
  const success = yield call(loginWithGoogle)
  yield put({ type: 'user/LOAD_CURRENT_ACCOUNT' })
  if (success) {
    yield history.push('/')
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in to Batafy',
    })
  }
}

export function* REGISTER_EMAIL({ payload }) {
  const { email, password, fullname } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(registerEmail, email, fullname, password)
  yield put({
    type: 'user/LOAD_CURRENT_ACCOUNT',
  })
  yield put({
    type: 'user/LOAD_CURRENT_ACCOUNT',
  })
  if (success) {
    const firstName = fullname.split(' ')
    yield history.push('/')
    notification.success({
      message: `Welcome ${firstName[0]}`,
      description: 'Account created successfully',
    })
  }
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(currentAccount)
  if (response) {
    const { uid: id, email, photoURL: avatar, displayName: name } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name,
        email,
        avatar,
        role: 'user',
        authorized: true,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeLatest(actions.LOGIN_WITH_GOOGLE, LOGIN_WITH_GOOGLE),
    takeLatest(actions.REGISTER_EMAIL, REGISTER_EMAIL),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
