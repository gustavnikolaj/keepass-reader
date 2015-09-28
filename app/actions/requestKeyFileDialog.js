import setKeyFilePath from './setKeyFilePath'

import ipc from 'ipc'

export default function requestKeyFileDialog () {
  return (dispatch, getState) => {
    ipc.once('keyFileDialogResponse', response => {
      if (response.error) {
        console.log('keyFileDialogResponse', response)
      } else {
        dispatch(setKeyFilePath(response.path))
      }
    })
    ipc.send('keyFileDialogRequest')
  }
}
