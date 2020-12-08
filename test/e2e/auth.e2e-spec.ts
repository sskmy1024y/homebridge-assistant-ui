import { Test, TestingModule } from '@nestjs/testing'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../../src/core/config/config.module'
import { AuthModule } from '../../src/core/auth/auth.module'
import * as path from 'path'
import * as fs from 'fs-extra'

describe('AuthController (e2e)', () => {
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
      imports: [TypeOrmModule.forRoot(), ConfigModule, AuthModule]
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

  /**
   * FIXME: When performing CI, hb-service cannot be accessed and an error occurs.
   * Therefore, it is temporarily commented out.
   * Will be available in the near future
   */

  it('POST /auth/config', async () => {
    //   const res = await app.inject({
    //     method: 'POST',
    //     path: '/auth/config',
    //     payload: {
    //       username: 'admin',
    //       password: 'admin'
    //     }
    //   })
    //   expect(res.statusCode).toEqual(200)
    //   expect(res.json().status).toEqual('ok')
  })

  afterAll(async () => {
    await app.close()
  })
})
