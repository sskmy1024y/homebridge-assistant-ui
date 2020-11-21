import { addSerializer } from 'jest-snapshot'
import React from 'react'
import ReactDOM from 'react-dom'
import initStoryshots, {
  multiSnapshotWithOptions
} from '@storybook/addon-storyshots'
import path from 'path'
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer'

// require.context系が動くようにする。
require('babel-plugin-require-context-hook/register')()

// mock for createPortal
function MockReactDOMPortal({ children }) {
  return children
}
const createPortalMock = jest.spyOn(ReactDOM, 'createPortal')
createPortalMock.mockImplementation((element, node) =>
  React.createElement(MockReactDOMPortal, { node }, element)
)

// mock for react-spring
const now = new Date('2019-01-01T00:00:00')
const nowMock = jest.spyOn(Date, 'now')
nowMock.mockImplementation(() => now)

addSerializer(styleSheetSerializer)

afterAll(() => {
  createPortalMock.mockRestore()
  nowMock.mockRestore()
})

initStoryshots({
  framework: 'react',
  // eslint-disable-next-line no-undef
  configPath: path.join(__dirname, '../../.storybook'),
  test: multiSnapshotWithOptions({
    createNodeMock: element => document.createElement(element.type)
  })
})
