import unlockDatabaseSubmit from './unlockDatabaseSubmit'

export default function unlockDatabase (masterKey) {
  return function (dispatch) {
    dispatch(unlockDatabaseSubmit())
    return
  }
}
