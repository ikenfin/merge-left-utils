import { mergeLeft } from '../src/merge-left'
import { mergeLeftDropping } from '../src/merge-left-dropping'

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

test('Check is empty dropKeys returns same result with mergeLeft', () => {
  expect(mergeLeft(source, null)).toEqual(mergeLeftDropping([], source, null))
  expect(mergeLeft(source, target)).toEqual(mergeLeftDropping([], source, target))
})

test('Check is keys dropped and not replaced from B', () => {
  expect(mergeLeftDropping(['a', 'b'], source, target)).toEqual({
    c: target.c,
    d: source.d,
    e: target.e
  })
})
