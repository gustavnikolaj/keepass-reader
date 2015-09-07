import { REQUEST_PASSWORD } from './types'

export default function requestPassword (index) {
  return {
    type: REQUEST_PASSWORD,
    index
  }
}
