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
// import { LessonSelectors } from '../Redux/LessonRedux'

export function * getLesson (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(LessonSelectors.getData)
  // make the call to the api
  const response = yield call(api.getlesson, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LessonActions.lessonSuccess(response.data))
  } else {
    yield put(LessonActions.lessonFailure())
  }
}

export function * exerciseRequest (api, {credential}) {
  try {    
    console.log("exerciseRequest saga req")
    console.log(credential)
    const access_token = yield select(AuthSelectors.getAccessToken)
    const push_token = yield select(AuthSelectors.getPushToken)
    const device_type = yield select(AuthSelectors.getDeviceType)
    const headers = {access_token, push_token}
    console.log("headers")
    console.log(headers)
    const response = yield call(api._getExercises, headers, credential)
    console.log("exerciseRequest saga res")
    console.log(response)
    if (response.ok) {
      var response_data = response.data
      if(response_data.success == "OK"){
        yield put(LessonActions.exerciseSuccess({exercises: response_data.exercises}))
        yield put(NavigationActions.navigate({ routeName: 'PageLessonDetail' }))
      }else{ // fail
        console.log("here1")
        yield put(AuthActions.exerciseFailure({message: response_data.message}))
        yield put(NavigationActions.navigate({ routeName: 'PageLessonDetail' }))
      }

    } else {
      console.log("here2")
      yield put(AuthActions.exerciseFailure({token_error: 'Token Invaild'}))
      // yield put(NavigationActions.navigate({ routeName: 'PageRegister' }))
    }
  } catch (e) {
    console.log(e)
    yield put(AuthActions.exerciseFailure({token_error: 'Network error'}))
    // yield put(AuthActions.checkTokenFailure({token_error: 'Network error'}))
    // yield put(NavigationActions.navigate({ routeName: 'PageRegister' }))
  }

}
