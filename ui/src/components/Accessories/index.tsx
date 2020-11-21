import { HomeKitTypes } from 'models/accessories/HomeKitTypes'
import { ServiceNS } from 'models/services'
import { Switch } from 'models/accessories/Switch'
import { getAuthToken } from 'modules/auth'
import { initWsServiceEvent, useConnectToNamespace } from 'modules/ws'
import { useAccessories } from 'modules/service/selector'
import { useDispatch, useEffect, useMemo } from 'hooks'
import React from 'react'
import SwitchWindow from './SwitchWindow'

/**
 * Component that creates the required window from the acquired accessory list
 */
const Accessories = () => {
  const dispatch = useDispatch()
  const accessories = useAccessories()
  const wsService = useConnectToNamespace(ServiceNS.Accessories)

  useEffect(() => {
    dispatch(getAuthToken({ usename: 'admin', password: 'admin' }))
  }, [dispatch])

  useEffect(() => {
    if (wsService !== null) {
      initWsServiceEvent(ServiceNS.Accessories, wsService, dispatch)
    }
  }, [dispatch, wsService])

  useEffect(() => {
    // FIXME:
    console.log('fetched Accessories', accessories)
  }, [accessories])

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
            return undefined
        }
      }),
    [accessories]
  )

  return <>{accessoryList}</>
}

export default Accessories
