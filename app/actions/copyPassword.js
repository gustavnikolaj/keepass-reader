import requestPassword from './requestPassword'
import passwordCopiedToClipboard from './passwordCopiedToClipboard'
import clipboardEmptied from './clipboardEmptied'
import unlockDatabaseFailed from './unlockDatabaseFailed'

import ipc from 'ipc'

export default function copyPassword (uuid) {
  return (dispatch, getState) => {
    dispatch(requestPassword(uuid))

    ipc.once('passwordResponse', response => {
      if (response.error) {
        dispatch(unlockDatabaseFailed())
      } else {
        // copy response.password to clipboard
        console.log('copying', response.password, 'to clipboard')
        dispatch(passwordCopiedToClipboard(uuid))
        setTimeout(function () {
          dispatch(clipboardEmptied());
        }, 1000)
      }
    })

    ipc.send('passwordRequest', uuid)
  }
}
