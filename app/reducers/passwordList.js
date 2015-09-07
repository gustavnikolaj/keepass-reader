import {
  REQUEST_PASSWORD_LIST,
  RECEIVE_PASSWORD_LIST,
  REQUEST_PASSWORD,
  RECEIVE_PASSWORD
} from '../actions/types'

const initialState = {
  isFetching: false,
  passwords: []
}

export function passwordList (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PASSWORD_LIST:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_PASSWORD_LIST:
      return {
        ...state,
        isFetching: false,
        passwords: action.passwords
      }
    case REQUEST_PASSWORD:
      var newState = { ...state }
      newState.passwords[action.index].isFetching = true
      return newState
    case RECEIVE_PASSWORD:
      var newState = { ...state }
      newState.passwords[action.index].isFetching = false
    default:
      return state
  }
}
