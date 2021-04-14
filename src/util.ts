export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/*
  naive check is input is like Object

  source: https://stackoverflow.com/a/38555871
*/
export const isLikeObject = (value: any) =>
  typeof value === 'object' &&
  value !== null &&
  value.constructor === Object &&
  Object.prototype.toString.call(value) === '[object Object]'

/*
  Function which always return true
*/
export const alwaysTrue = () => true
