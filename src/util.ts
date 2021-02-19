export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/*
  naive check is input is like Object
*/
export const isLikeObject = (value: any) =>
  (value != null && value.constructor === Object) || value instanceof Object

/*
  Function which always return true
*/
export const alwaysTrue = () => true
