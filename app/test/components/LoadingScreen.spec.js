import React from 'react'
import { expectForComponents as expect } from '../unexpectedWithAddons'
import LoadingScreen from '../../components/LoadingScreen'

describe('LoadingScreen Component', function () {
  it('should render a loading screen', function () {
    return expect(<LoadingScreen />, 'to render as', (
      <b>
        Loading...
      </b>
    ))
  })
})
