import * as path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AccessoryLog } from '../../src/entities/accessoryLog.entity';
import { AccessoryLogDto } from '../../src/modules/accessory-log/accessory-log.dto';
import { AccessoryLogModule } from '../../src/modules/accessory-log/accessory-log.module';

describe('AccessoryLogController (e2e)', () => {
  let app: NestFastifyApplication;

  const accessoryLog : AccessoryLog[] = [
    {
      uuid: "3e2b85a1-21cd-4b10-ae5b-abe8fe09305d",
      accessoryUuid: '32e291d1-295a-4b45-8be8-663824df1bb0',
      accessoryType: 'Thermostat',
      value: "{'TargetTemperature': 28}",
      createdAt: new Date(2020, 10, 10, 9, 50)
    }
  ]

  const MockRepository = {
    provide: getRepositoryToken(AccessoryLog),
    useValue: {
      find: () => accessoryLog,
      insert: entity => ({
        "identifiers": [
            {
                "uuid": entity.uuid
            }
        ],
        "generatedMaps": [
            {
                "uuid": entity.uuid,
                "createdAt": entity.createdAt
            }
        ],
        "raw": [...accessoryLog, entity].length
      }),
      update: (id, entity) => entity,
      delete: () => accessoryLog.splice(0, 1),
    },
  }

  beforeAll(async () => {
    process.env.UIX_BASE_PATH = path.resolve(__dirname, '../../');
    process.env.UIX_STORAGE_PATH = path.resolve(__dirname, '../', '.homebridge');
    process.env.UIX_CONFIG_PATH = path.resolve(process.env.UIX_STORAGE_PATH, 'config.json');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([AccessoryLog]), AccessoryLogModule]
    }).overrideProvider(MockRepository.provide).useValue(MockRepository.useValue).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }));

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('GET /accessory-log', async () => {
    const res = await app.inject({
      method: 'GET',
      path: '/accessory-log'
    });

    expect(res.statusCode).toEqual(200);
    expect(res.json()).toEqual(JSON.parse(JSON.stringify(accessoryLog)));
  });

  it('POST /accessory-log (valid send accessory)', async () => {
    const payload : AccessoryLogDto = {
      accessoryType: 'Light Sensor',
      accessoryUUID: '2e1ff47c-f4ac-4b00-a09b-06d165cb6e31',
      value: "{'CurrentAmbientLightLevel': 109}"
    }

    const res = await app.inject({
      method: 'POST',
      path: '/accessory-log',
      payload
    });

    expect(res.statusCode).toEqual(201);
    expect(res.json()).toHaveProperty('identifiers');
  });


  afterAll(async () => {
    await app.close();
  });
});
