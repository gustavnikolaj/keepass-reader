import requestPasswordList from './requestPasswordList'
import receivePasswordList from './receivePasswordList'
import unlockDatabaseSubmit from './unlockDatabaseSubmit'
import unlockDatabaseFailed from './unlockDatabaseFailed'
import unlockDatabaseSucceeded from './unlockDatabaseSucceeded'

import ipc from 'ipc'

export default function fetchPasswordList (masterKey) {
  return (dispatch, getState) => {
    dispatch(unlockDatabaseSubmit())
    dispatch(requestPasswordList())

    ipc.once('passwordListResponse', response => {
      if (response.error) {
        dispatch(unlockDatabaseFailed())
      } else {
        dispatch(unlockDatabaseSucceeded())
        dispatch(receivePasswordList(response.passwords))
      }
    })
    ipc.send('passwordListRequest', masterKey)
  }
}
