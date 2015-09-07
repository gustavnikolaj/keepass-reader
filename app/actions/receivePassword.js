import { RECEIVE_PASSWORD } from './types'

export default function receivePassword (index, password) {
  return {
    type: RECEIVE_PASSWORD,
    index
  }
}
