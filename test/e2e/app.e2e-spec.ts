import { Test, TestingModule } from '@nestjs/testing'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '../../src/app.module'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    )

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
