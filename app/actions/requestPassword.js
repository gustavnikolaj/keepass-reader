import { REQUEST_PASSWORD } from './types'

export default function requestPassword (uuid) {
  return {
    type: REQUEST_PASSWORD,
    uuid
  }
}
