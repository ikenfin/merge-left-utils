import { DeepPartial } from './util'
import { mergeLeftKeys } from './merge-left-keys'

/*
  Shortcut function
  Replace only existing fields in {a} with {b}

  ex: ({ a: 0, b: 0 }, { a: 1, x: 1 }) -> { a: 1, b: 0 }
*/
export function mergeLeft<T extends Record<string, any>> (
  source: T,
  target?: DeepPartial<T>
): T {
  return mergeLeftKeys<T>(Object.keys(source), source, target)
}
