import requestPassword from './requestPassword'
import passwordCopiedToClipboard from './passwordCopiedToClipboard'
import unlockDatabaseFailed from './unlockDatabaseFailed'

import ipc from 'ipc'

export default function copyPassword (uuid) {
  return (dispatch, getState) => {
    dispatch(requestPassword(uuid))

    ipc.once('passwordResponse', response => {
      if (response.error) {
        dispatch(unlockDatabaseFailed())
      } else {
        dispatch(passwordCopiedToClipboard(response.timeout))
      }
    })

    ipc.send('passwordRequest', uuid)
  }
}
