import { Test, TestingModule } from '@nestjs/testing'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '../../src/app.module'
import * as path from 'path'
import * as fs from 'fs-extra'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    process.env.AUI_BASE_PATH = path.resolve(__dirname, '../../')
    process.env.AUI_STORAGE_PATH = path.resolve(__dirname, '../', '.homebridge')
    process.env.HB_CONFIG_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'config.json')
    process.env.AUI_CONFIG_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'assistant', 'config.json')

    // setup test config
    await fs.copy(path.resolve(__dirname, '../mocks', 'config.json'), process.env.HB_CONFIG_PATH)
    await fs.copy(path.resolve(__dirname, '../mocks', 'assistant', 'config.json'), process.env.AUI_CONFIG_PATH)

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        skipMissingProperties: true
      })
    )

    await app.init()
    await app
      .getHttpAdapter()
      .getInstance()
      .ready()
  })

  it('GET /', async () => {
    const res = await app.inject({
      method: 'GET',
      path: '/'
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual('Hello World!')
  })

  afterAll(async () => {
    await app.close()
  })
})
