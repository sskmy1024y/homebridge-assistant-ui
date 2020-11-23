export const Sender = {
  User: 'user',
  Assistant: 'assistant'
} as const
export type Sender = typeof Sender[keyof typeof Sender]

export interface MessageVO {
  message: string
  sender: Sender
  timestamp: number
}
