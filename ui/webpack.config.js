const path = require('path')

const WebpackBarPlugin = require('webpackbar')
const CopyFilePlugin = require('copy-webpack-plugin')

const sourcePath = path.resolve(__dirname, 'src')

function webpackDevConfig(rawEnv, optionArg) {
  const outputPath = path.resolve(__dirname, 'public')

  return {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.tsx',
    output: {
      path: outputPath,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          include: sourcePath,
          use: 'ts-loader'
        },
        {
          test: /\.(js|jsx)?$/,
          include: sourcePath,
          use: 'babel-loader'
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new WebpackBarPlugin({
        name: 'Three VRM',
        color: 'green',
        profile: true,
        fancy: true
      })
    ],
    resolve: {
      modules: [sourcePath, 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.json']
    }
  }
}

function webpackBuildConfig(rawEnv, optionArg) {
  const outputPath = path.resolve(__dirname, '../public')

  return {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
      path: outputPath,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          include: sourcePath,
          use: 'ts-loader'
        },
        {
          test: /\.(js|jsx)?$/,
          include: sourcePath,
          use: 'babel-loader'
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new WebpackBarPlugin({
        name: 'Three VRM',
        color: 'green',
        profile: true,
        fancy: true
      }),
      new CopyFilePlugin({
        patterns: [
          {
            from: '**/*',
            context: 'public/',
            to: outputPath,
            globOptions: {
              ignore: ['*.js', '*.map']
            }
          }
        ]
      })
    ],
    resolve: {
      modules: [sourcePath, 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.json']
    }
  }
}

const webpackConfig =
  (process.env.NODE_ENV || 'development') === 'development'
    ? webpackDevConfig
    : webpackBuildConfig

module.exports = webpackConfig
