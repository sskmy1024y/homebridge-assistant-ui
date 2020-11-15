import { Test, TestingModule } from '@nestjs/testing'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'

import { MessageLogModule } from '../../src/modules/message-log/message-log.module'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { MessageLog } from '../../src/entities/messageLog.entity'
import { MessageLogDto } from '../../src/modules/message-log/message-log.dto'

describe('MessageLogController (e2e)', () => {
  let app: NestFastifyApplication

  const messageLogs = [
    {
      uuid: '3e2b85a1-21cd-4b10-ae5b-abe8fe09305d',
      sender: 'user',
      message: 'hello world!',
      createdAt: new Date(2020, 10, 10, 9, 50)
    }
  ]

  const MockRepository = {
    provide: getRepositoryToken(MessageLog),
    useValue: {
      find: () => messageLogs,
      insert: entity => ({
        identifiers: [
          {
            uuid: entity.uuid
          }
        ],
        generatedMaps: [
          {
            uuid: entity.uuid,
            createdAt: entity.createdAt
          }
        ],
        raw: [...messageLogs, entity].length
      }),
      update: (id, entity) => entity,
      delete: () => messageLogs.splice(0, 1)
    }
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([MessageLog]),
        MessageLogModule
      ]
    })
      .overrideProvider(MockRepository.provide)
      .useValue(MockRepository.useValue)
      .compile()

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

  it('GET /message-log', async () => {
    const res = await app.inject({
      method: 'GET',
      path: '/message-log'
    })

    expect(res.statusCode).toEqual(200)
    expect(res.json()).toEqual(JSON.parse(JSON.stringify(messageLogs)))
  })

  it('POST /message-log (valid send message)', async () => {
    const payload: MessageLogDto = {
      sender: 'user',
      message: 'aaaaaaaaa'
    }

    const res = await app.inject({
      method: 'POST',
      path: '/message-log',
      payload
    })

    expect(res.statusCode).toEqual(201)
    expect(res.json()).toHaveProperty('identifiers')
  })

  afterAll(async () => {
    await app.close()
  })
})
