import { Injectable } from '@nestjs/common'
import * as fetch from 'sync-fetch'
import { FastifyRequest } from 'fastify'

@Injectable()
export class AuthService {
  private _hbServiceHostname: string
  private _hbServiceToken: string

  get hbServiceHostname() {
    return this._hbServiceHostname
  }

  get hbServiceToken() {
    return this._hbServiceToken
  }

  set hbServiceToken(token: string) {
    this._hbServiceToken = token
  }

  public prepareHbServiceRequest(req: FastifyRequest, port: number) {
    const host = req.hostname.match(/(.*):\d{1,5}/i)?.[1] ?? req.hostname
    this._hbServiceHostname = `${req.protocol}://${host}:${port}`
  }

  public hbServiceAuth(username: string, password: string) {
    if (!this._hbServiceHostname) return null

    const result = fetch(`${this._hbServiceHostname}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).json() as {
      access_token: string
      token_type: string
      expires_in: number
    }
    this._hbServiceToken = result.access_token

    return result
  }

  public hbServiceGetUserId(username: string) {
    if (!this._hbServiceHostname || !this._hbServiceToken) return null

    const users = fetch(`${this._hbServiceHostname}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._hbServiceToken}`
      }
    }).json()

    const foundUser = users.find(user => user?.username === username)
    if (foundUser) {
      return foundUser.id
    }

    return null
  }
}
