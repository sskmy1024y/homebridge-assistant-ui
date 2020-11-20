'use strict'

/* eslint-disable @typescript-eslint/no-var-requires */
const os = require('os')
const path = require('path')

const env = process.env.NODE_ENV

const dbPath =
  process.env.AUI_DATABASE_PATH || env === 'production'
    ? path.resolve(os.homedir(), '.homebridge', 'hb-assistant.sqlite')
    : './data/hb-assistant.sqlit'

// Use ts for e2e testing
const entitiesPath =
  env === 'test'
    ? path.resolve(__dirname, 'src/entities/**/*.entity.ts')
    : path.resolve(__dirname, 'dist/entities/**/*.entity.js')

const config = {
  type: 'sqlite',
  database: dbPath,
  entities: [entitiesPath],
  migrations: ['./dist/migrations/**/*.js'],
  logging: true
}

module.exports = config
