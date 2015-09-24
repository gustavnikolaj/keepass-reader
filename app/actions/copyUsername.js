import passwordCopiedToClipboard from './passwordCopiedToClipboard'
import unlockDatabaseFailed from './unlockDatabaseFailed'
import closeWindow from './closeWindow'

import ipc from 'ipc'

export default function copyUsername (uuid) {
  return (dispatch, getState) => {
    ipc.once('usernameResponse', response => {
      if (response.error) {
        dispatch(unlockDatabaseFailed())
      } else {
        dispatch(passwordCopiedToClipboard(response.timeout))
        dispatch(closeWindow())
      }
    })

    ipc.send('usernameRequest', uuid)
  }
}
