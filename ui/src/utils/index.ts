/**
 * "Lifting" a function into optional context.
 *
 * Curried version of `mapOptional`
 */
export const liftOptional = <T, U>(
  f: (domain: T) => U
): ((optionalDomain: T | undefined) => U | undefined) => domain =>
  domain !== undefined ? f(domain) : undefined

export const sleep = (msec: number) =>
  new Promise(resolve => setTimeout(resolve, msec))
