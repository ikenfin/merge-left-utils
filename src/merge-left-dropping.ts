import type { DeepPartial } from './util'
import { mergeLeftKeys } from './merge-left-keys'

/**
  Shortcut function
  Drops keys listed in {dropKeys} and replace existing fields in {a} with {b}

  ex: (['a'], { a: 0, b: 0 }, { a: 1, x: 1 }) -> { b: 0 }
*/
export function mergeLeftDropping<T extends Record<string, any>> (
  dropKeys: (keyof T)[],
  source: T,
  target?: DeepPartial<T>
): T {
  const replaceableKeys = Object.keys(source).filter(
    (keyOfSource) => dropKeys.indexOf(keyOfSource) === -1
  )

  return mergeLeftKeys<T>(replaceableKeys, source, target)
}
