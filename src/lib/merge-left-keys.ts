import { alwaysTrue, isLikeObject, DeepPartial } from './util'

/*
  Function merge objects {a} and {b} by [keys]
  If key from {b} is not presented in {a} - it does nothing
  If both objects has key - result will get key from {b}
  if value is seems like object - then we run function recursive for value

  keys - which keys will be checked for objects
  a - left
  b - right
  customLogic (a[key], target[key]) : boolean -
    if it returns true - then get value from {b}, else from {a}
*/
export function mergeLeftKeys<T extends Record<string, any>> (
  keys: string[],
  source: T,
  target?: DeepPartial<T>,
  customLogic: (
    key: string,
    source: T,
    target: DeepPartial<T>
  ) => boolean = alwaysTrue
): T {
  if (!target) {
    return source
  }

  return keys.reduce<T>((prev: T, key) => {
    if (
      target &&
      target.hasOwnProperty(key) &&
      customLogic(key, source, target)
    ) {
      if (isLikeObject(source[key])) {
        return {
          ...prev,
          [key]: mergeLeftKeys<T>(
            Object.keys(source[key]),
            source[key],
            target[key],
            customLogic
          )
        }
      }
      else {
        return {
          ...prev,
          [key]: target[key]
        }
      }
    }
    else {
      return {
        ...prev,
        [key]: source[key]
      }
    }
  }, {} as T)
}
