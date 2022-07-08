import { mergeLeftOnly } from '../src/merge-left-only'

const source: Record<string, string> = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e'
}

const target: Record<string, string> = {
  a: 'a from target',
  b: 'b from target',
  c: 'c from target',
  e: 'e from target',
  f: 'f from target'
}

test('Check is empty onlyKeys source', () => {
  expect(mergeLeftOnly([], source, null)).toEqual(source)
  expect(mergeLeftOnly([], source, target)).toEqual(source)
})

test('Check that only listed keys replaced from B', () => {
  expect(mergeLeftOnly([ 'a', 'b' ], source, target)).toEqual({
    a: target.a,
    b: target.b,
    c: source.c,
    d: source.d,
    e: source.e
  })
})
