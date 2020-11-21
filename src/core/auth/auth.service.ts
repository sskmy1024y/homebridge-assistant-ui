import { Injectable } from '@nestjs/common'
import * as fetch from 'sync-fetch'
import { FastifyRequest } from 'fastify'

@Injectable()
export class AuthService {
  public hbServiceAuth({
    username,
    password,
    req,
    port
  }: {
    username: string
    password: string
    req: FastifyRequest
    port: number
  }) {
    const host = req.hostname.match(/(.*):\d{4,5}/i)?.[1] ?? req.hostname
    const hostname = `${req.protocol}://${host}:${port}`

    return fetch(`${hostname}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).json()
  }
}
