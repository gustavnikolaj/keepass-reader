import { SET_PATH } from './types'

export default function setPath (path) {
  return {
    type: SET_PATH,
    path
  }
}
