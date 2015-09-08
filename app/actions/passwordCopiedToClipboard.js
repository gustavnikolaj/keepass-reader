import { PASSWORD_COPIED_TO_CLIPBOARD } from './types'

export default function passwordCopiedToClipboard (uuid) {
  return {
    type: PASSWORD_COPIED_TO_CLIPBOARD,
    uuid
  }
}
