import * as path from 'path'

const dbPath = process.env.AUI_DATABASE_PATH || './data/hb-assistant.sqlit'

const config = {
  type: 'sqlite',
  database: dbPath,
  entities: [path.resolve(__dirname, 'entities/**/*.entity.js')],
  migrations: ['migrations/**/*.js'],
  logging: true
}

module.exports = config
