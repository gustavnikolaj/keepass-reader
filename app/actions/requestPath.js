import setPath from './setPath'

import ipc from 'ipc'

export default function requestPath (callback) {
  return (dispatch, getState) => {
    ipc.once('pathResponse', response => {
      dispatch(setPath(response.path))
      if (callback) callback()
    })
    ipc.send('pathRequest')
  }
}
