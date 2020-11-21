import { ServiceNS } from 'models/services'
import { useMemo, useSelector } from 'hooks'

export const useService = () => {
  return useSelector(state => state.service)
}

export const useAccessories = () => {
  const services = useService()
  return useMemo(() => services[ServiceNS.Accessories], [services])
}

export const useAccessory = (uuid: string) => {
  const accessories = useAccessories()
  return useMemo(() => accessories.get(uuid), [accessories, uuid])
}
