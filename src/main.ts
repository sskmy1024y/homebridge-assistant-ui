import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import * as path from 'path'
import * as fs from 'fs-extra'
import fmp from 'fastify-multipart'
import { AppModule } from './app.module'
import { ConfigService } from './core/config/config.service'

process.env.AUI_BASE_PATH = path.resolve(__dirname, '../')

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  const configService: ConfigService = app.get(ConfigService)

  // serve index.html without a cache
  app.getHttpAdapter().get('/', async (req, res) => {
    res.type('text/html')
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.header('Pragma', 'no-cache')
    res.header('Expires', '0')
    res.send(await fs.readFile(path.resolve(process.env.AUI_BASE_PATH, 'public/index.html')))
  })

  // serve static assets with a long cache timeout
  app.useStaticAssets({
    root: path.resolve(process.env.AUI_BASE_PATH, 'public'),
    setHeaders(res) {
      res.setHeader('Cache-Control', 'public,max-age=31536000,immutable')
    }
  })

  app.register(fmp)
  app.enableCors()
  app.setGlobalPrefix('/api')

  await app.listen(configService.port, '0.0.0.0')
}
bootstrap()
