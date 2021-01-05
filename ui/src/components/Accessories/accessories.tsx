import { Constants } from 'utils/constants'
import { HomeKitTypes } from 'models/accessories/HomeKitTypes'
import { ServiceNS } from 'models/services'
import { Switch } from 'models/accessories/Switch'
import { fetchLayout } from 'modules/layout/operations'
import { getVRMConfigFromToken } from 'modules/vrm/operations'
import { initWsServiceEvent, useConnectToNamespace } from 'modules/ws'
import { useAccessories } from 'modules/service/selector'
import { useDispatch, useEffect, useLocalStorage, useMemo } from 'hooks'
import { useHbServiceUserId } from 'modules/auth'
import ClockWindow from './ClockWindow'
import React from 'react'
import SwitchWindow from './SwitchWindow'

/**
 * Component that creates the required window from the acquired accessory list
 */
const Accessories = () => {
  const dispatch = useDispatch()
  const userId = useHbServiceUserId()
  const accessories = useAccessories()
  const wsService = useConnectToNamespace(ServiceNS.Accessories)

  const [username] = useLocalStorage(Constants.localStorage.username, '')
  const [accessToken] = useLocalStorage(Constants.localStorage.accessToken, '')

  useEffect(() => {
    dispatch(getVRMConfigFromToken({ username, accessToken }))
  }, [accessToken, dispatch, username])

  useEffect(() => {
    if (userId) dispatch(fetchLayout(userId))
  }, [dispatch, userId])

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

  return (
    <>
      {accessoryList}
      <ClockWindow />
    </>
  )
}

export default Accessories
