import { post } from 'api/client'

export interface AssistantConfigApiResponseDto {
  status: 'ok' | 'error'
  body: {
    version: string
    vrmPath: string
    hbServiceUserId: string
    hbServiceHost: string
    hbServiceToken: string
    assistantName: string
    camera: {
      position: {
        x: number
        y: number
        z: number
      }
      target: {
        x: number
        y: number
        z: number
      }
    }
  }
}

enum AuthType {
  withPassword,
  withToken
}

export async function fetchAssistantConfig(username: string, password: string) {
  const response = await post<AssistantConfigApiResponseDto>('auth/config', {
    username,
    password,
    type: AuthType.withPassword
  })
  return response.parsedBody?.body
}

export async function fetchAssistantConfigFromToken(
  username: string,
  accessToken: string
) {
  const response = await post<AssistantConfigApiResponseDto>('auth/config', {
    username,
    accessToken,
    type: AuthType.withToken
  })
  return response.parsedBody?.body
}
