import expect from 'unexpected'
import receivePassword from '../../actions/receivePassword'

describe('actions/receivePassword', function () {
  it('should be a function', () => {
    return expect(receivePassword, 'to be a function')
  })
})
