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
        console.log('clipboard clearing in', response.timeout)
        dispatch(passwordCopiedToClipboard(uuid))
        setTimeout(function () {
          dispatch(clipboardEmptied())
        }, response.timeout)
      }
    })

    ipc.send('passwordRequest', uuid)
  }
}
