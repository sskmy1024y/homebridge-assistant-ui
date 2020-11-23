import { configure, addParameters } from '@storybook/react'

addParameters({
  // https://github.com/storybooks/storybook/blob/next/docs/src/pages/configurations/options-parameter/index.md#global-options
  options: {
    theme: {
      brandTitle: 'react-template'
    },
    sortStoriesByKind: true
  }
})

const req = require.context('../src', true, /\.stories\.tsx$/)

function loadStories() {
  for (const context of [req]) {
    context.keys().forEach(module => context(module))
  }
}

configure(loadStories, module)
