const path = require('path')

const WebpackBarPlugin = require('webpackbar')

const sourcPath = path.resolve(__dirname, '../src')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: 'ts-loader'
  })
  config.plugins.push(
    new WebpackBarPlugin({
      name: 'Storybook',
      color: 'green',
      profile: true,
      fancy: true
    })
  )
  config.resolve.modules.push(sourcPath)
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
