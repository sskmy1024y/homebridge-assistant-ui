import { post } from 'api/client'

export interface AuthApiResponceDto {
  access_token: string
  expires_in: number
  token_type: 'Bearer'
}

export async function fetchAuthToken(username: string, password: string) {
  const response = await post<AuthApiResponceDto>('auth/login', {
    username,
    password
  })
  return response.parsedBody
}
