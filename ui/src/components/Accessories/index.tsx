import { HomeKitTypes } from 'models/accessories/HomeKitTypes'
import { ServiceNS } from 'models/services'
import { Switch } from 'models/accessories/Switch'
import { fetchLayout } from 'modules/layout/operations'
import {
  getAuthToken,
  useHbServiceHost,
  useHbServiceUserId
} from 'modules/auth'
import { getVRMConfig } from 'modules/vrm/operations'
import { initWsServiceEvent, useConnectToNamespace } from 'modules/ws'
import { useAccessories } from 'modules/service/selector'
import { useDispatch, useEffect, useMemo } from 'hooks'
import ClockWindow from './ClockWindow'
import React from 'react'
import SwitchWindow from './SwitchWindow'

/**
 * Component that creates the required window from the acquired accessory list
 */
const Accessories = () => {
  const dispatch = useDispatch()
  const userId = useHbServiceUserId()
  const hbServiceHost = useHbServiceHost()
  const accessories = useAccessories()
  const wsService = useConnectToNamespace(ServiceNS.Accessories)

  useEffect(() => {
    dispatch(getVRMConfig({ usename: 'admin', password: 'admin' }))
  }, [dispatch])

  useEffect(() => {
    if (hbServiceHost) {
      dispatch(
        getAuthToken({ usename: 'admin', password: 'admin', hbServiceHost })
      )
    }
  }, [hbServiceHost, dispatch])

  useEffect(() => {
    if (userId) dispatch(fetchLayout(userId))
  }, [dispatch, userId])

  useEffect(() => {
    if (wsService !== null) {
      initWsServiceEvent(ServiceNS.Accessories, wsService, dispatch)
    }
  }, [dispatch, wsService])

  const accessoryList = useMemo(
    () =>
      Array.from(accessories.values()).map(accessory => {
        switch (accessory.type) {
          case HomeKitTypes.Switch: {
            return (
              <SwitchWindow
                key={accessory.uuid}
                accessory={accessory as Switch}
              />
            )
          }
          default:
            return null
        }
      }),
    [accessories]
  )

  if (!userId) {
    return null
  }

  return (
    <>
      {accessoryList}
      <ClockWindow />
    </>
  )
}

export default Accessories
