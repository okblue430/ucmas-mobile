import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signInRequest: ['signin_credential'],
  signInSuccess: ['payload'],
  signInFailure: ['payload'],
  resendCodeRequest: null,
  resendCodeSuccess: ['payload'],
  resendCodeFailure: ['payload'],
  verifyCodeRequest: ['credential'],
  verifyCodeSuccess: ['payload'],
  verifyCodeFailure: ['payload'],
  initStatesForAuthentication: null,
  checkToken: ['payload'],
  checkTokenSuccess: ['payload'],
  checkTokenFailure: ['payload'],
  profileUpdateRequest: ['credential'],
  profileUpdateSuccess: ['payload'],
  profileUpdateFailure: ['payload'],
  signOut: null,
  initTokenError: null,
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  access_token: null,
  device_type: '',
  push_token: '',
  child: {},
  children: [],
  fetching: false,
  auth_error: "",
  auth_success: false,
  isRequested: false,
  token_error: null,
  checking: false,
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data,
  getAccessToken: state => state.auth.access_token,
  getPushToken: state => state.auth.push_token,
  getDeviceType: state => state.auth.device_type,
  getUserInfo: state => state.auth.child
}

/* ------------- Reducers ------------- */

export const signInRequest = (state, action) => {
  // console.log("action signinrequest")
  // console.log(action.signin_credential)
  const { device_type, push_token } = action.signin_credential
  return state.merge({ auth_fetching: true, auth_error: "", access_token: null, device_type, push_token, child: {}, isRequested: false })
}

export const signInSuccess = (state, action) => {
  // console.log('AuthRedux /signInSuccess', action)
  const { access_token } = action.payload
  return state.merge({ auth_fetching: false, auth_error: "", access_token, isRequested: true, token_error: null })
}

export const signInFailure = (state, action) => {
  // console.log('AuthRedux /signInFailure', action)
  const { message } = action.payload
  return state.merge({ auth_fetching: false, auth_error: message, access_token: null, isRequested: false })
}

export const initStatesForAuthentication = (state) => 
  state.merge({
    isRequested: false,
    auth_error: "",
    auth_success: false,
    auth_fetching: false,
    token_error: null,
    checking: false
  })

export const signOut = (state) => {
  return state.merge({
    access_token: null,
    isRequested: false,
    auth_error: "",
    auth_success: null,
    auth_fetching: false,
    child: {},
  })
}

export const checkToken = (state) => {
  return state.merge({
    checking: true
  })
}

export const checkTokenSuccess = (state) => {
  return state.merge({
    checking: false,
    token_error: null
  })
}

export const checkTokenFailure = (state, { payload }) => {
  const { token_error } = payload
  return state.merge({
    checking: false,
    token_error
  })
}

export const initTokenError = (state) => {
  console.log('initTokenError', state)
  return state.merge({
    token_error: null
  })
}

export const resendCodeRequest = (state) => {
  return state.merge({ auth_fetching: true, auth_error: "", auth_success: false})
}
export const resendCodeSuccess = (state, action) => {
  console.log('AuthRedux /resendCodeSuccess', action)
  return state.merge({ auth_fetching: false, auth_success: true })
}
export const resendCodeFailure = (state, action) => {
  console.log('AuthRedux /ResendCodeFailure', action)
  const { message } = action.payload
  return state.merge({ auth_fetching: false, auth_error: message })
}

export const verifyCodeRequest = (state, action) => {
  return state.merge({ auth_fetching: true, auth_error: ""})
}
export const verifyCodeSuccess = (state, action) => {
  console.log('AuthRedux / verifyCodeSuccess', action)
  const { child, children } = action.payload
  return state.merge({ auth_fetching: false, auth_error: "", children, child })
}
export const verifyCodeFailure = (state, action) => {
  console.log('AuthRedux /verifyCodeFailure', action)
  const { message } = action.payload
  return state.merge({ auth_fetching: false, auth_error: message})
}

export const profileUpdateRequest = (state) => {
  return state.merge({ auth_fetching: true, auth_error: ""})
}
export const profileUpdateSuccess = (state, action) => {
  console.log('AuthRedux / profileUpdateSuccess', action)
  const { child, children } = action.payload
  return state.merge({ auth_fetching: false, auth_success: true, auth_error: "", children, child })
}

export const profileUpdateFailure = (state, action) => {
  console.log('AuthRedux /updateFailure', action)
  const { message } = action.payload
  return state.merge({ auth_fetching: false, auth_error: message})
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,
  [Types.INIT_STATES_FOR_AUTHENTICATION]: initStatesForAuthentication,
  [Types.SIGN_OUT]: signOut,
  [Types.CHECK_TOKEN]: checkToken,
  [Types.CHECK_TOKEN_SUCCESS]: checkTokenSuccess,
  [Types.CHECK_TOKEN_FAILURE]: checkTokenFailure,
  [Types.INIT_TOKEN_ERROR]: initTokenError,
  [Types.RESEND_CODE_REQUEST]: resendCodeRequest,
  [Types.RESEND_CODE_SUCCESS]: resendCodeSuccess,
  [Types.RESEND_CODE_FAILURE]: resendCodeFailure,
  [Types.VERIFY_CODE_REQUEST]: verifyCodeRequest,
  [Types.VERIFY_CODE_SUCCESS]: verifyCodeSuccess,
  [Types.VERIFY_CODE_FAILURE]: verifyCodeFailure,
  [Types.PROFILE_UPDATE_REQUEST]: profileUpdateRequest,
  [Types.PROFILE_UPDATE_SUCCESS]: profileUpdateSuccess,
  [Types.PROFILE_UPDATE_FAILURE]: profileUpdateFailure,
})
