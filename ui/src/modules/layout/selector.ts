import { useMemo, useSelector } from 'hooks'

export const useLayout = (uuid: string) => {
  const layout = useSelector(state => state.layout[uuid] ?? {})
  return useMemo(() => layout, [layout])
}
