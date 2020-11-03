import * as path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

import { MessageLogModule } from '../../src/modules/message-log/message-log.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageLog } from '../../src/entities/messageLog.entity';

describe('MessageLogController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    process.env.UIX_BASE_PATH = path.resolve(__dirname, '../../');
    process.env.UIX_STORAGE_PATH = path.resolve(__dirname, '../', '.homebridge');
    process.env.UIX_CONFIG_PATH = path.resolve(process.env.UIX_STORAGE_PATH, 'config.json');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([MessageLog]), MessageLogModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }));

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('GET /message-log', async () => {
    const res = await app.inject({
      method: 'GET',
      path: '/message-log'
    });

    expect(res.statusCode).toEqual(200);
    expect(res.json()).toEqual([]);
  });

  it('POST /message-log (valid send message)', async () => {
    const res = await app.inject({
      method: 'POST',
      path: '/message-log',
      payload: {
        sender: 'user',
        message: 'aaaaaaaaa'
      }
    });

    expect(res.statusCode).toEqual(201);
    expect(res.json()).toHaveProperty('identifiers');
  });


  afterAll(async () => {
    await app.close();
  });
});
