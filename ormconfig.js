'use strict'

/* eslint-disable @typescript-eslint/no-var-requires */
const os = require('os')
const path = require('path')

const dbPath =
  process.env.UIX_DATABASE_PATH || process.env.NODE_ENV === 'production'
    ? path.resolve(os.homedir(), '.homebridge/hb-assistant.sqlite')
    : './data/hb-assistant.sqlit'

const config = {
  type: 'sqlite',
  database: dbPath,
  entities: ['dist/entities/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  logging: true
}

module.exports = config
