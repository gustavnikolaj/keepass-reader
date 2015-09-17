import ipc from 'ipc'

export default function closeWindow () {
  return (dispatch, getState) => {
    // this action could dispatch an action with type CLOSE_WINDOW if we wanted
    // to react on it in the UI
    ipc.send('closeWindowRequest')
  }
}
