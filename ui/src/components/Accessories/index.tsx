import { HomeKitTypes } from 'models/accessories/HomeKitTypes'
import { Humidity } from 'models/accessories/Humidity'
import { ServiceNS } from 'models/services'
import { Switch } from 'models/accessories/Switch'
import { Templature } from 'models/accessories/Templature'
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
import HumidityWindow from './HumidityWindow'
import React from 'react'
import SwitchWindow from './SwitchWindow'
import TemplatureWindow from './TemplatureWindow'

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
    dispatch(getVRMConfig({ username: 'admin', password: 'admin' }))
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

  useEffect(() => {
    console.log(accessories)
  }, [accessories])

  const accessoryList = useMemo(
    () =>
      Array.from(accessories.values()).map(accessory => {
        switch (accessory.humanType) {
          case HomeKitTypes.Switch: {
            return (
              <SwitchWindow
                key={accessory.uuid}
                accessory={accessory as Switch}
              />
            )
          }
          case HomeKitTypes.TemperatureSensor: {
            return (
              <TemplatureWindow
                key={accessory.uuid}
                accessory={accessory as Templature}
              />
            )
          }
          case HomeKitTypes.HumiditySensor: {
            return (
              <HumidityWindow
                key={accessory.uuid}
                accessory={accessory as Humidity}
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
