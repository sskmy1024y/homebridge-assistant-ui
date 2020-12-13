import { post } from './client'

export async function sendMessageLog(sender: string, message: string) {
  const response = await post(`message-log`, {
    sender,
    message
  })
  return response.parsedBody
}
