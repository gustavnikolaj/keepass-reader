import { RECEIVE_PASSWORD } from './types'

export default function receivePassword (data) {
  return {
    type: RECEIVE_PASSWORD,
    data
  }
}
