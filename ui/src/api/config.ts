import { post } from 'api/client'

export interface AssistantConfigApiResponseDto {
  status: 'ok' | 'error',
  body: {
    version: string,
    vrmPath: string,
    hbServiceHost: string,
    assistantName: string,
    camera: {
      position: {
        x: number,
        y: number,
        z: number
      },
      target: {
        x: number,
        y: number,
        z: number
      }
    }
  }
}

export async function fetchAssistantConfig(username: string, password: string) {
  const response = await post<AssistantConfigApiResponseDto>('auth/config', {
    username,
    password
  })
  return response.parsedBody?.body
}
