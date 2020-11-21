/** OperationType: Name of the operation to perform */
export const OperationType = {
  TurnOn: 'TURN_ON',
  TurnOff: 'TURN_OFF'
} as const
export type OperationType = typeof OperationType[keyof typeof OperationType]

export const ErrorType = {
  WsConnectionError: 'WS_CONNECTION_ERROR',
  AccessoryNotFoundError: 'ACCESSORY_NOT_FOUND_ERROR',
  OperationNotFoundError: 'OPERATION_NOT_FOUND_ERROR',
  OperationTimeoutError: 'OPERATION_TIMEOUT_ERROR',
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
