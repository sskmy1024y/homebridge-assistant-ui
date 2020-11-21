/** OperationType: Name of the operation to perform */
export const OperationType = {
  Greeting: 'GREETING',
  Hungry: 'HNUGRY'
} as const
export type OperationType = typeof OperationType[keyof typeof OperationType]

export const ErrorType = {
  UnknownError: 'UNKNOWN_ERROR'
} as const
export type ErrorType = typeof ErrorType[keyof typeof ErrorType]

/** EntityMap: Map of the corresponding Entity */
export type EntityMapType = {
  [key in OperationType]: string[]
}

/** ReplyMap: Map of the success reply messages */
export type ReplyMapType = {
  [key in OperationType]: string[]
}

/** ErrorMap: Map of the error reply messages */
export type ErrorMapType = {
  [key in ErrorType]: string[]
}
