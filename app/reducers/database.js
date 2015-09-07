import {
  UNLOCK_DATABASE_SUBMIT,
  UNLOCK_DATABASE_FAILED,
  UNLOCK_DATABASE_SUCCEEDED,
  DATABASE_NOT_UNLOCKED,
  DATABASE_UNLOCKED
} from '../actions/types'

const initialState = {
  isUnlocked: false,
  isUnlocking: false
}

export function database (state = initialState, action) {
  switch (action.type) {
    case UNLOCK_DATABASE_SUBMIT:
      return {
        isUnlocked: false,
        isUnlocking: true
      }
    case UNLOCK_DATABASE_FAILED:
    case DATABASE_NOT_UNLOCKED:
      return {
        isUnlocked: false,
        isUnlocking: false
      }
    case UNLOCK_DATABASE_SUCCEEDED:
    case DATABASE_UNLOCKED:
      return {
        isUnlocked: true,
        isUnlocking: false
      }
    default:
      return state
  }
}
