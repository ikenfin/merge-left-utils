import { DeepPartial } from './util'
import { mergeLeftKeys } from './merge-left-keys'

/*
  Shortcut function
  Replace only existing fields in {a} with {b} skipping {b} keys from {keys}

  ex: (['a'], { a: 0, b: 0 }, { a: 1, b: 1 }) -> { a: 0, b: 1 }
*/
export function mergeLeftExcept<T extends Record<string, any>> (
  skippingKeys: string[],
  source: T,
  target?: DeepPartial<T>
): T {
  return mergeLeftKeys<T>(
    Object.keys(source),
    source,
    target,
    (keyOfSource) => skippingKeys.indexOf(keyOfSource) === -1
  )
}
