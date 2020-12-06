import { get, put } from './client'

interface FetchLayoutApiResponseDto {
  status: string
  body: {
    [accessoryUUID: string]: LayoutPayload
  }
}

export async function fetchAccessoryLayout(userId: string) {
  const response = await get<FetchLayoutApiResponseDto>(`layout/${userId}`)
  return response.parsedBody?.body
}

interface LayoutPayload {
  width: number
  height: number
  x: number
  y: number
}

export async function updateAccessoryLayout(
  userId: string,
  accessoryUUID: string,
  payload: LayoutPayload
) {
  const response = await put(`layout/${userId}/${accessoryUUID}`, payload)
  return response.parsedBody
}
