import { EffectCallback, useEffect } from 'react'

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useDidMount = (effect: EffectCallback) => useEffect(effect, [])
