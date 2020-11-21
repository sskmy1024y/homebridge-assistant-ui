import { post } from 'api/client'

export interface AssistantConfigApiResponseDto {
  status: 'ok' | 'error',
  body: {
    version: string,
    vrmPath: string,
    hbServicePort: number,
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
  const response = await post<AssistantConfigApiResponseDto>('config', {
    userId: "1"
  })
  return response.parsedBody?.body
}
