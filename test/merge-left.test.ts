import { mergeLeftKeys } from '../src/merge-left-keys'
import { mergeLeft } from '../src/merge-left'

const source: Record<string, any> = {
  a: 'a',
  b: 'b',
  c: [],
  d: {},
  e: [ 'e0', 'e1' ],
  mapV: new Map([
    [ 'hello', 'world' ],
    [ 'foo', 'bar' ]
  ]),
  setV: new Set([ 'i', 'am', 'the', 'set!' ])
}

const target: Record<string, any> = {
  a: 'a from target',
  b: 'b from target',
  c: 'c from target',
  e: 'e from target',
  f: 'f from target',
  mapV: { isPlain: true },
  setV: [ 'i', 'am', 'the', 'array' ]
}

test('check is source empty array replaced by target value', () => {
  expect(mergeLeftKeys([ 'c' ], source, target)).toEqual({
    c: target.c
  })
})

test('check is null/false/NaN/undefined values from source are replaced with target', () => {
  const source: Record<string, any> = {
    undefinedValue: undefined,
    nullValue: null,
    falseValue: false,
    nanValue: NaN
  }

  const target: Record<string, any> = {
    undefinedValue: 'value',
    nullValue: 'value',
    falseValue: true,
    nanValue: 100
  }

  expect(mergeLeft(source, target)).toEqual(target)
})

test('check Map/Set types work correctly', () => {
  const targetMapValue = target['mapV']
  const targetSetValue = target['setV']

  expect(mergeLeftKeys([ 'mapV' ], source, target)).toEqual({
    mapV: targetMapValue
  })

  expect(mergeLeftKeys([ 'setV' ], source, target)).toEqual({
    setV: targetSetValue
  })
})

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
  const customLogicFn = (key: string, _source: any, _target: any) => {
    expect(Object.keys(source).includes(key)).toBe(true)
    expect(_source).toStrictEqual(source)
    expect(_target).toStrictEqual(target)

    return false
  }

  mergeLeftKeys(Object.keys(source), source, target, customLogicFn)
})

test('test mergeLeftKeys customLogic callback', () => {
  const customLogicFn = (key: string) => {
    return ![ 'a', 'b' ].includes(key)
  }

  const replacementResult = Object.keys(source).reduce((acc, key) => {
    if (target[key] && customLogicFn(key)) {
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

test('Test nullish prototype case', () => {
  const nullishProto = {
    a: {
      b: {
        c: 'd',
        e: 'f'
      }
    }
  }

  Object.setPrototypeOf(nullishProto, null)
  expect(Object.getPrototypeOf(nullishProto)).toBe(null)
  expect(mergeLeft(nullishProto, nullishProto)).toEqual(nullishProto)
})
