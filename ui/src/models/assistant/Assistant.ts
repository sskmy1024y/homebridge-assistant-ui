import { Dispatch } from 'redux'
import { MotionManager } from 'utils/MotionManager'
import { RootState } from 'modules/reducer'
import { VRM } from '@pixiv/three-vrm'
import { resolveAction } from './actions'

const OperationResult = {
  MessageParseError: 'MESSAGE_PARSE_ERROR',
  WsConnectionError: 'WS_CONNECTION_ERROR',
  AccessoryNotFound: 'ACCESSORY_NOT_FOUND',
  OperationNotMatch: 'OPERATION_NOT_MATCH'
} as const
type OperationResult = typeof OperationResult[keyof typeof OperationResult]

/**
 * I hope that local A.I. bots will appear in the future by mutual power.
 */
export class Assistant {
  private _motionManager: MotionManager

  /**
   * @param message User send message
   */
  constructor(vrm: VRM) {
    this._motionManager = new MotionManager(vrm)
  }

  get motionManager() {
    return this._motionManager
  }

  public action(userMessage: string, rootState: RootState, dispatch: Dispatch) {
    resolveAction(userMessage, rootState, dispatch)
  }

  private _sendErrorMessage(error: OperationResult) {
    switch (error) {
      case OperationResult.WsConnectionError: {
        return '接続にエラーが発生しました'
      }
      case OperationResult.AccessoryNotFound: {
        return '指定されたデバイスが見つかりませんでした'
      }
      case OperationResult.OperationNotMatch: {
        return 'その操作はできません'
      }
      case OperationResult.MessageParseError:
      default: {
        return 'すみません、よくわかりません'
      }
    }
  }
}
