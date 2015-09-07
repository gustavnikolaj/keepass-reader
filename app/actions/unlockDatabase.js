import unlockDatabaseSubmit from './unlockDatabaseSubmit'
import unlockDatabaseSucceeded from './unlockDatabaseSucceeded'
import unlockDatabaseFailed from './unlockDatabaseFailed'

export default function unlockDatabase (masterKey) {
  return function (dispatch) {

    dispatch(unlockDatabaseSubmit())

    // SUBMIT KEY THROUGH IPC TO KEEPASS CLIENT
    return

    dispatch(unlockDatabaseFailed())
    dispatch(unlockDatabaseSucceeded())

  }
}
