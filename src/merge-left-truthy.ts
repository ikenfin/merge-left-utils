import type { DeepPartial } from './util'
import { mergeLeftKeys } from './merge-left-keys'
import { alwaysTrue } from './util'

/**
  Shortcut function
  Replace only existing fields in {a} with {b}
  When field from {b} is truthy

  ex: ({ a: 0, b: 0 }, { a: 1, x: 1 }) -> { a: 1, b: 0 }
*/
export function mergeLeftTruthy<T extends Record<string, any>> (
  source: T,
  target?: DeepPartial<T>,
  customLogic: (
    key: keyof T,
    source: T,
    target: DeepPartial<T>
  ) => boolean = alwaysTrue
): T {
  return mergeLeftKeys<T>(
    Object.keys(source),
    source,
    target,
    (key, source, target) => {
      return !!target[key] && customLogic(key, source, target)
    }
  )
}
