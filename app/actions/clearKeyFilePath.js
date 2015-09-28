import setKeyFilePath from './setKeyFilePath'

import ipc from 'ipc'

export default function clearKeyFilePath () {
  return (dispatch, getState) => {
    ipc.once('clearKeyFilePathResponse', response => {
      if (response.error) {
        console.log('clearKeyFilePathResponse', response)
      } else {
        dispatch(setKeyFilePath(null))
      }
    })
    ipc.send('clearKeyFilePathRequest')
  }
}
