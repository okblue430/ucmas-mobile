import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  lessonRequest: ['data'],
  lessonSuccess: ['payload'],
  lessonFailure: null,
  exerciseRequest: ['credential'],
  exerciseSuccess: ['payload'],
  exerciseFailure: null,
})

export const LessonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  lessons: [],
  exercises: [],
  fetching: null,
  payload: null,
  error: null,
  activeLessonID: 0
})

/* ------------- Selectors ------------- */

export const LessonSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null, lessons: [] })

// successful api lookup
export const success = (state, action) => {
  const { lessons } = action.payload
  return state.merge({ fetching: false, error: null, lessons })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */
export const exerciseRequest = (state, action) => {
  const {lesson_id} = action.credential
  console.log("activeLessonID : " + lesson_id)
  return state.merge({ exercises: [], activeLessonID: lesson_id})
}
export const exerciseSuccess = (state, action) => {
  console.log('LessonRedux /exerciseSuccess', action)
  const { exercises } = action.payload
  return state.merge({ exercises })
}
export const exerciseFailure = (state, action) => {
  console.log('LessonRedux /exerciseFailure', action)
  return state.merge({ exercises: [], activeLessonID: 0})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LESSON_REQUEST]: request,
  [Types.LESSON_SUCCESS]: success,
  [Types.LESSON_FAILURE]: failure,
  [Types.EXERCISE_REQUEST]: exerciseRequest,
  [Types.EXERCISE_SUCCESS]: exerciseSuccess,
  [Types.EXERCISE_FAILURE]: exerciseFailure,
})
