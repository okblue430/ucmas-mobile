// a library to wrap and simplify api calls
import apisauce from 'apisauce'
const baseURL = 'https://ucmas.no/api/'

const authenticate = () => {
  const _api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    // 15 second timeout...
    timeout: 15000
  })
  
  const _signInByEmail = (credential) => _api.post('account/register', credential)
  const _resendCode = (access_token) => _api.post('account/resendcode', access_token)
  const _verifyCode = (credential) => _api.post('account/verify', credential)
  const _checkToken = (params) => {
    _api.setHeader('Access-Token', params.access_token);
    _api.setHeader('Device-Id', params.push_token);
    return _api.post('account/checkToken', {user_id: params.user_id})
  }
  

  return {
    _signInByEmail,
    _resendCode,
    _verifyCode,
    _checkToken
  }
}

const lessons = () => {
  const _api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    // 15 second timeout...
    timeout: 15000
  })
  
  const _getExercises = (headers, params) => {
    _api.setHeader('Access-Token', headers.access_token);
    _api.setHeader('Device-Id', headers.push_token);
    return _api.post('exercise', params)
  }
  

  return {
    _getExercises,
  }
}

// let's return back our create method as the default.
export default {
  authenticate,
  lessons,
}
