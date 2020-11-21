import { Observable, Subject } from 'rxjs'

export interface WsService {
  connected?: Subject<any>
  socket: SocketIOClient.Socket
  request: (
    resource: string,
    payload?: string | object | Array<any>
  ) => Observable<any>
  end?: () => void
}
