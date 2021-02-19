import { isLikeObject, alwaysTrue } from '../src/lib/util'

test('alwaysTrue is always returns true', () => {
  expect(alwaysTrue()).toBe(true)
})

test('test isLikeObject', () => {
  expect(isLikeObject({})).toBe(true)
  expect(isLikeObject(new Object())).toBe(true)
  expect(isLikeObject('')).toBe(false)
  expect(isLikeObject(123)).toBe(false)
  expect(isLikeObject(null)).toBe(false)
  expect(isLikeObject(undefined)).toBe(false)
})
