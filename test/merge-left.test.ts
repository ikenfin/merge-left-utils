import { mergeLeftKeys } from '../src/lib/merge-left-keys'
import { mergeLeft } from '../lib/merge-left'

const source = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e'
}

const target = {
  a: 'a from target',
  b: 'b from target',
  c: 'c from target',
  e: 'e from target',
  f: 'f from target'
}

test('check if mergeLeftKeys does nothing on falsy target value', () => {
  expect(mergeLeftKeys([ 'a' ], source, null)).toEqual(source)
  expect(mergeLeftKeys([ 'a' ], source)).toEqual(source)
})

test('check if mergeLeft does nothing on falsy target value', () => {
  expect(mergeLeft(source, null)).toEqual(source)
  expect(mergeLeft(source)).toEqual(source)
})

test('check if mergeLeftKeys replaces only wanted keys', () => {
  const keysToReplace = [ 'c' ]

  const replacementResult = {
    c: 'c from target'
  }

  const callResult = mergeLeftKeys(keysToReplace, source, target)
  expect(callResult).toMatchObject(replacementResult)
})

test('check if mergeLeftKeys customLogic callback grabs correct args', () => {
  const customLogicFn = (key, _source, _target) => {
    expect(Object.keys(source).includes(key)).toBe(true)
    expect(_source).toStrictEqual(source)
    expect(_target).toStrictEqual(target)

    return false
  }

  mergeLeftKeys(Object.keys(source), source, target, customLogicFn)
})

test('test mergeLeftKeys customLogic callback', () => {
  const customLogicFn = (key, source, target) => {
    return ![ 'a', 'b' ].includes(key)
  }

  const replacementResult = Object.keys(source).reduce((acc, key) => {
    if (target[key] && customLogicFn(key, source, target)) {
      return { ...acc, [key]: target[key] }
    }
    return { ...acc, [key]: source[key] }
  }, {})

  const callResult = mergeLeftKeys(
    Object.keys(source),
    source,
    target,
    customLogicFn
  )

  expect(callResult).toEqual(replacementResult)
})

test('test mergeLeft result contains only source fields', () => {
  const replacementResult = Object.keys(source).reduce((acc, key) => {
    if (target[key]) {
      return { ...acc, [key]: target[key] }
    }
    return { ...acc, [key]: source[key] }
  }, {})

  const callResult = mergeLeft(source, target)
  expect(callResult).toEqual(replacementResult)
  expect(Object.keys(callResult)).toEqual(Object.keys(source))
})
