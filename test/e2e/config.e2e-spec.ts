import { Test, TestingModule } from '@nestjs/testing'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../../src/core/config/config.module'
import * as path from 'path'
import * as fs from 'fs-extra'
import fmp from 'fastify-multipart'

describe('ConfigController (e2e)', () => {
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
      imports: [TypeOrmModule.forRoot(), ConfigModule]
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())

    app.register(fmp)
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

  it('POST /config (before update assistantName)', async () => {
    const res = await app.inject({
      method: 'POST',
      path: '/config',
      payload: {
        userId: '1'
      }
    })

    expect(res.statusCode).toEqual(200)
    expect(res.json().status).toEqual('ok')
    expect(res.json().body.assistantName).toEqual('yui')
  })

  it('PUT /config (update assistantName)', async () => {
    const res = await app.inject({
      method: 'PUT',
      path: '/config',
      payload: {
        assistantName: 'hanako',
        userId: '1'
      }
    })

    expect(res.statusCode).toEqual(200)
    expect(res.json().status).toEqual('ok')
  })

  it('POST /config (after update assistantName)', async () => {
    const res = await app.inject({
      method: 'POST',
      path: '/config',
      payload: {
        userId: '1'
      }
    })

    expect(res.statusCode).toEqual(200)
    expect(res.json().status).toEqual('ok')
    expect(res.json().body.assistantName).toEqual('hanako')
  })

  afterAll(async () => {
    await app.close()
  })
})
