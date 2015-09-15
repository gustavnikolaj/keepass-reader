import unexpected from 'unexpected'
import unexpectedReactShallow from 'unexpected-react-shallow'
import React from 'react'
let TestUtils = React.addons.TestUtils

export var expectForComponents = unexpected
  .clone()
  .use(unexpectedReactShallow)
  .addAssertion('to render as', (expect, subject, value) => {
    var renderer = React.addons.TestUtils.createRenderer()
    renderer.render(subject)
    return expect(renderer, 'to have rendered', value)
  })
