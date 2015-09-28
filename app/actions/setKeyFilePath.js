import { SET_KEY_FILE_PATH } from './types'

export default function setKeyFilePath (path) {
  return {
    type: SET_KEY_FILE_PATH,
    path
  }
}
