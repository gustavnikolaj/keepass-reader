import setPath from './setPath'

import ipc from 'ipc'

export default function requestPathDialog () {
  return (dispatch, getState) => {
    ipc.once('pathDialogResponse', response => {
      if (response.error) {
        console.log('pathDialogResponse', response)
      } else {
        dispatch(setPath(response.path))
      }
    })
    ipc.send('pathDialogRequest')
  }
}
