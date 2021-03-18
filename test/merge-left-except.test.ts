import { mergeLeft } from '../src/merge-left'
import { mergeLeftExcept } from '../src/merge-left-except';

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

test('Check is empty skippingKeys returns same result with mergeLeft', () => {
  expect(mergeLeft(source, null)).toEqual(mergeLeftExcept([], source, null))
  expect(mergeLeft(source, target)).toEqual(mergeLeftExcept([], source, target))
})

test('Check is skipped keys not replaced from B', () => {
  expect(mergeLeftExcept(['a', 'b'], source, target)).toEqual({
    a: source.a,
    b: source.b,
    c: target.c,
    d: source.d,
    e: target.e
  })
})
