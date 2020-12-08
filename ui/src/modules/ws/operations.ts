/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Ws from 'modules/ws'
import { Dispatch } from 'redux'
import { Observable, Subject } from 'rxjs'
import { ServiceEvent } from 'models/services'
import { ServiceNS } from 'models/services/namespace'
import { ServiceType } from '@oznu/hap-client'
import { WsService } from 'models/WsService'
import { connect } from 'socket.io-client'
import { setServiceResponse } from 'modules/service'
import { setSocket } from '.'
import { useDispatch } from 'hooks'
import { useHbServiceHost, useToken } from 'modules/auth'
import { useMemo } from 'react'
import { useWs } from './selectors'

export const connectToNamespace = (
  namespace: ServiceNS,
  { namespaceConnectionCache }: Ws.State,
  token: string | null,
  wsHostname: string | null,
  dispatch: Dispatch
) => {
  if (namespaceConnectionCache[namespace]) {
    /* connection to namespace already exists */
    const io: WsService = namespaceConnectionCache[namespace] as WsService
    io.connected = new Subject()

    // broadcast to sbuscribers that the connection is ready
    setTimeout(() => {
      if (io.socket.connected) {
        io.connected?.next()
      }
    })

    // watch for re-connections, and broadcast
    io.socket.on('connect', () => {
      io.connected?.next()
    })

    // define end function
    io.end = () => {
      io.socket.emit('end')
      io.socket.removeAllListeners()
      io.connected?.complete()
    }

    return io
  } else if (token !== null && wsHostname !== null) {
    const io = establishConnectionToNamespace(namespace, token, wsHostname)
    io.connected = new Subject()

    // wait for the connection and broadcase when ready
    io.socket.on('connect', () => {
      io.connected?.next()
    })

    // define end function
    io.end = () => {
      io.socket.emit('end')
      io.socket.removeAllListeners()
      io.connected?.complete()
    }

    dispatch(setSocket({ namespace, wsService: io }))

    return io
  } else {
    return null
  }
}

export const useConnectToNamespace = (namespace: ServiceNS) => {
  const dispatch = useDispatch()
  const token = useToken()
  const ws = useWs()
  const wsHostname = useHbServiceHost()
  return useMemo(
    () => connectToNamespace(namespace, ws, token, wsHostname, dispatch),
    [namespace, ws, token, wsHostname, dispatch]
  )
}

function establishConnectionToNamespace(
  namespace: ServiceNS,
  token: string,
  socketHostname: string
): WsService {
  const socket = connect(`${socketHostname}/${namespace}`, {
    query: {
      token
    }
  })

  function request(resource: string, payload: any): Observable<any> {
    return new Observable(observer => {
      socket.emit(resource, payload, (resp: any) => {
        if (typeof resp === 'object' && resp.error) {
          observer.error(resp)
        } else {
          observer.next(resp)
        }
        observer.complete()
      })
    })
  }

  return {
    socket,
    request
  }
}

/**
 * Initialize socket event
 * @param wsService WsService
 * @param dispatch
 */
export const initWsServiceEvent = (
  namespace: ServiceNS,
  wsService: WsService,
  dispatch: Dispatch
) => {
  switch (namespace) {
    case ServiceNS.Accessories:
      return initAccessoriesEvent(wsService, dispatch)
    default:
      return wsService
  }
}

/**
 * Initialize socket.io event for Accessories.
 */
export const initAccessoriesEvent = (
  wsService: WsService,
  dispatch: Dispatch<any>
) => {
  if (wsService.connected) {
    wsService.socket.emit(ServiceEvent.accessories.GetAccessirues)

    setTimeout(() => {
      wsService.connected?.subscribe(() => {
        wsService.socket.emit(ServiceEvent.accessories.GetAccessirues)
      })
    }, 1000)
  }

  wsService.socket.on(
    ServiceEvent.accessories.AccessoriesData,
    (response: ServiceType[]) => {
      dispatch(
        setServiceResponse({ namespace: ServiceNS.Accessories, response })
      )
    }
  )

  return wsService
}
