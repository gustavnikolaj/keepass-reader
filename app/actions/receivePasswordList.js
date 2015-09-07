import { RECEIVE_PASSWORD_LIST } from './types'

export default function receivePasswordList (passwords) {
  return {
    type: RECEIVE_PASSWORD_LIST,
    passwords
  }
}
