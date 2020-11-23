import { post } from 'api/client'

export interface AuthApiResponceDto {
  access_token: string
  expires_in: number
  token_type: 'Bearer'
}

export async function fetchAuthToken(username: string, password: string, host: string) {
  const response = await post<AuthApiResponceDto>('auth/login', {
    username,
    password
  }, `${host}/api`)
  return response.parsedBody
}
