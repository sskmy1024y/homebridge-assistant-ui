import * as rr from 'react-redux'
import { RootState } from 'modules/reducer'

/**
 * Type-safe `useSelector` for the redux store
 */
export const useSelector: rr.TypedUseSelectorHook<RootState>
/**
 * Type-safe `useDispatch` for the redux store
 */
export function useDispatch(): Store['dispatch']
/**
 * Type-safe `useStore` for the redux store
 */
export function useStore(): Store
