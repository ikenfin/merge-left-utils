import { mergeLeftTruthy } from '../src/merge-left-truthy'

const source: Record<string, string> = {
  a: 'source:a',
  b: 'source:b',
  c: 'source:c',
  e: 'source:e',
  f: 'source:f',
  g: 'source:g',
  h: 'source:h',
  i: 'source:i',
  j: 'source:j',
  k: 'source:k',
  l: 'source:l',
  m: 'source:m',
  o: 'source:o',
  p: 'source:p',
  q: 'source:q',
  r: 'source:r',
  s: 'source:s',
  t: 'source:t',
  u: 'source:u'
}

const target: Record<string, any> = {
  a: 'a from target',
  b: 'b from target',
  c: 'c from target',
  e: 'e from target',
  f: undefined,
  g: null,
  h: 0,
  i: -1,
  j: [],
  k: {},
  l: false,
  m: -0,
  o: '',
  p: '',
  q: ``,
  r: NaN,
  s: () => {},
  t: 'false',
  u: 'null'
}

test('Check are fields repalaced only with truthy target fields', () => {
  expect(mergeLeftTruthy(source, target)).toEqual({
    ...source,
    a: target.a,
    b: target.b,
    c: target.c,
    e: target.e,
    i: target.i,
    j: target.j,
    k: target.k,
    s: target.s,
    t: target.t,
    u: target.u
  })
})
