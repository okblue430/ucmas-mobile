/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import LessonActions from '../Redux/LessonRedux'
import { NavigationActions } from 'react-navigation'
import { AuthSelectors } from '../Redux/AuthRedux'

export function * signInRequest (api, { signin_credential }) {

  try {    
    // console.log("auth saga req")
    // console.log(signin_credential)
    const signin_response = yield call(api._signInByEmail, signin_credential)
    // console.log("auth saga res")
    // console.log(signin_response)
    if (signin_response.ok) {

      var response_data = signin_response.data
      if(response_data.success == "OK"){
        var access_token = response_data.access_token
        yield put(AuthActions.signInSuccess({access_token}))
        yield put(NavigationActions.navigate({ routeName: 'PageVerify' }))
      }else{ // fail
        yield put(AuthActions.signInFailure({message: response_data.message}))
      }

    } else {
      yield put(AuthActions.signInFailure({message: "There was problem signing in! Try again."}))
    }
  } catch (e) {
    console.log(e)
    yield put(AuthActions.signInFailure({message: "There was problem signing in! Try again."}))
  }
}

export function * resendCodeRequest (api) {
  try {    
    console.log("resendCode saga req")
    const access_token = yield select(AuthSelectors.getAccessToken)
    console.log(access_token)
    const response = yield call(api._resendCode, {access_token})
    console.log("resendCode saga res")
    console.log(response)
    if (response.ok) {
      var response_data = response.data
      if(response_data.success == "OK"){
        yield put(AuthActions.resendCodeSuccess())
      }else{ // fail
        yield put(AuthActions.resendCodeFailure({message: response_data.message}))
      }
    } else {
      yield put(AuthActions.resendCodeFailure({message: "There was problem resending verification code in! Try again."}))
    }
  } catch (e) {
    console.log(e)
    yield put(AuthActions.resendCodeFailure({message: "There was problem resending verification code in! Try again."}))
  }
}
export function * verifyCodeRequest (api, { credential }) {
  try {    
    // console.log("verifyCode saga req")
    // console.log(credential)
    const {verify_code} = credential;
    const access_token = yield select(AuthSelectors.getAccessToken)
    const push_token = yield select(AuthSelectors.getPushToken)
    const device_type = yield select(AuthSelectors.getDeviceType)
    const request_credential = {verify_code, access_token, device_type, push_token}
    // console.log(request_credential)
    const response = yield call(api._verifyCode, request_credential)
    // console.log("verifyCode saga res")
    // console.log(response)
    if (response.ok) {
      var response_data = response.data
      if(response_data.success == "OK"){
        yield put(AuthActions.verifyCodeSuccess({child: response_data.child, children: response_data.children}))
        yield put(LessonActions.lessonSuccess({lessons: response_data.lessons}))
        yield put(NavigationActions.navigate({ routeName: 'PageRegisterSuccess' }))
      }else{ // fail
        yield put(AuthActions.verifyCodeFailure({message: response_data.message}))
      }

    } else {
      yield put(AuthActions.verifyCodeFailure({message: "There was problem verify code in! Try again."}))
    }
  } catch (e) {
    console.log(e)
    yield put(AuthActions.verifyCodeFailure({message: "There was problem verify code in! Try again."}))
  }
}

export function * checkToken (api, param) {
  try {    
    // console.log("auth check token saga req")
    // console.log(param.payload)
    const response = yield call(api._checkToken, param.payload)
    // console.log("auth check token saga res")
    // console.log(response)
    if (response.ok) {
      var response_data = response.data
      if(response_data.success == "OK"){
        yield put(AuthActions.verifyCodeSuccess({child: response_data.child, children: response_data.children}))
        yield put(LessonActions.lessonSuccess({lessons: response_data.lessons}))
        yield put(NavigationActions.navigate({ routeName: 'App' }))
      }else{ // fail
        console.log("here1")
        yield put(AuthActions.verifyCodeFailure({message: response_data.message}))
        yield put(NavigationActions.navigate({ routeName: 'PageRegister' }))
      }

    } else {
      console.log("here2")
      yield put(AuthActions.checkTokenFailure({token_error: 'Auto login error'}))
      yield put(NavigationActions.navigate({ routeName: 'PageRegister' }))
    }
  } catch (e) {
    console.log(e)
    yield put(AuthActions.checkTokenFailure({token_error: 'Network error'}))
    yield put(NavigationActions.navigate({ routeName: 'PageRegister' }))
  }

}

export function * signOut (action) {
  yield put(NavigationActions.navigate({ routeName: 'Auth' }))
}
