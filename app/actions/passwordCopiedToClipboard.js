import { PASSWORD_COPIED_TO_CLIPBOARD } from './types'

export default function passwordCopiedToClipboard (timeout) {
  return {
    type: PASSWORD_COPIED_TO_CLIPBOARD,
    timeIn: Date.now(),
    timeOut: Date.now() + timeout
  }
}
