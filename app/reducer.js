import {
  UNLOCK_DATABASE_SUBMIT,
  UNLOCK_DATABASE_FAILED,
  UNLOCK_DATABASE_SUCCEEDED,
  DATABASE_NOT_UNLOCKED,
  DATABASE_UNLOCKED,
  REQUEST_PASSWORD_LIST,
  RECEIVE_PASSWORD_LIST,
  PASSWORD_COPIED_TO_CLIPBOARD,
  CLIPBOARD_EMPTIED
} from './actions/types.js'

const initialState = {
  isUnlocked: false,
  isUnlocking: false,
  path: '',
  passwordOnClipboard: false,
  isFetchingPasswordList: false,
  passwordList: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case UNLOCK_DATABASE_SUBMIT:
      return {
        ...state,
        isUnlocked: false,
        isUnlocking: true
      }
    case UNLOCK_DATABASE_FAILED:
    case DATABASE_NOT_UNLOCKED:
      return {
        ...state,
        isUnlocked: false,
        isUnlocking: false
      }
    case UNLOCK_DATABASE_SUCCEEDED:
    case DATABASE_UNLOCKED:
      return {
        ...state,
        isUnlocked: true,
        isUnlocking: false
      }
    case PASSWORD_COPIED_TO_CLIPBOARD:
      return {
        ...state,
        passwordOnClipboard: action.uuid
      }
    case CLIPBOARD_EMPTIED:
      return {
        ...state,
        passwordOnClipboard: false
      }
    case REQUEST_PASSWORD_LIST:
      return {
        ...state,
        isFetchingPasswordList: true
      }
    case RECEIVE_PASSWORD_LIST:
      return {
        ...state,
        passwordList: action.passwords,
        isFetchingPasswordList: false
      }
    default:
      return state
  }
}
