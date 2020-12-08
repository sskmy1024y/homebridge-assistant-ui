import { Test, TestingModule } from '@nestjs/testing'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import * as fs from 'fs-extra'
import fmp from 'fastify-multipart'
import { LayoutModule } from '../../src/core/layout/layout.module'

const DUMMY_ACCESSORY_UUID = `dfb01209-666a-4759-b21b-ba42c894fde8`

describe('LayoutController (e2e)', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    process.env.AUI_BASE_PATH = path.resolve(__dirname, '../../')
    process.env.AUI_STORAGE_PATH = path.resolve(__dirname, '../', '.homebridge')
    process.env.HB_CONFIG_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'config.json')
    process.env.AUI_CONFIG_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'assistant', 'config.json')
    process.env.AUI_LAYOUT_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'assistant', 'layout.json')

    // setup test config
    await fs.copy(path.resolve(__dirname, '../mocks', 'config.json'), process.env.HB_CONFIG_PATH)
    await fs.copy(path.resolve(__dirname, '../mocks', 'assistant', 'layout.json'), process.env.AUI_LAYOUT_PATH)

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), LayoutModule]
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

  it('GET /layout', async () => {
    const res = await app.inject({
      method: 'GET',
      path: '/layout/1'
    })

    expect(res.statusCode).toEqual(200)
    expect(res.json().status).toEqual('ok')
    expect(res.json().body).toHaveProperty(DUMMY_ACCESSORY_UUID)
    expect(res.json().body[DUMMY_ACCESSORY_UUID].width).toEqual(420)
    expect(res.json().body[DUMMY_ACCESSORY_UUID].height).toEqual(340)
  })

  it('PUT /layout (update layout)', async () => {
    const res = await app.inject({
      method: 'PUT',
      path: `/layout/1/${DUMMY_ACCESSORY_UUID}`,
      payload: {
        width: 100,
        height: 50,
        x: 10,
        y: 10
      }
    })

    expect(res.statusCode).toEqual(200)
    expect(res.json().status).toEqual('ok')
  })

  it('GET /layout (after updated)', async () => {
    const res = await app.inject({
      method: 'GET',
      path: '/layout/1'
    })

    expect(res.statusCode).toEqual(200)
    expect(res.json().status).toEqual('ok')
    expect(res.json().body).toHaveProperty(DUMMY_ACCESSORY_UUID)
    expect(res.json().body[DUMMY_ACCESSORY_UUID].width).toEqual(100)
    expect(res.json().body[DUMMY_ACCESSORY_UUID].height).toEqual(50)
  })

  afterAll(async () => {
    await app.close()
  })
})
