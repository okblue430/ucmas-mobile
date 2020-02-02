import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { AuthTypes } from '../Redux/AuthRedux'
import { LessonTypes } from '../Redux/LessonRedux'

/* ------------- Sagas ------------- */

import {
  signInRequest,
  resendCodeRequest,
  verifyCodeRequest,
  checkToken,
  signOut
} from './AuthSagas'

import { 
  exerciseRequest
} from './LessonSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
/* ------------- Connect Types To Sagas ------------- */

// custom
const authApi = API.authenticate()
const lessonApi = API.lessons()

export default function * root () {
  yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signInRequest, authApi),
    takeLatest(AuthTypes.RESEND_CODE_REQUEST, resendCodeRequest, authApi),
    takeLatest(AuthTypes.VERIFY_CODE_REQUEST, verifyCodeRequest, authApi),
    takeLatest(AuthTypes.CHECK_TOKEN, checkToken, authApi),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    takeLatest(LessonTypes.EXERCISE_REQUEST, exerciseRequest, lessonApi),
  ])
}
