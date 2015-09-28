import setKeyFilePath from './setKeyFilePath'

import ipc from 'ipc'

export default function requestKeyFilePath (callback) {
  return (dispatch, getState) => {
    ipc.once('keyFilePathResponse', response => {
      console.log('setting keyFile path')
      dispatch(setKeyFilePath(response.path))
      if (callback) callback()
    })
    ipc.send('keyFilePathRequest')
  }
}
