import type { DeepPartial } from './util'
import { mergeLeft } from './merge-left'

/**
  Shortcut function
  Replace only fields from [keys] arg in {a} with {b}

  ex: (['b'], { a: 0, b: 0 }, { a: 1, b: 1 }) -> { a: 0, b: 1 }
*/
export function mergeLeftOnly<T extends Record<string, any>> (
  keys: [keyof T] | string[],
  source: T,
  target?: DeepPartial<T>
): T {
  return mergeLeft<T>(source, target, (key) => keys.includes(key))
}
