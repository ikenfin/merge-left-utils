import { mergeLeft } from '../src/merge-left'

const source = {
  fieldA: 'sourceA',
  fieldB: {
    fieldBA: 'sourceBA'
  },
  fieldC: {
    fieldCA: 'sourceCA',
    fieldCB: {
      fieldCBA: 'sourceCBA'
    }
  }
}

test('Check merge on second level', () => {
  const callResult = mergeLeft(source, { fieldB: { fieldBA: 'targetBA' } })
  expect(callResult).toHaveProperty('fieldB.fieldBA', 'targetBA')
})

test('Check merge on third levels', () => {
  const callResult = mergeLeft(source, {
    fieldC: {
      fieldCB: { fieldCBA: 'targetCBA' }
    }
  })
  expect(callResult).toHaveProperty('fieldC.fieldCB.fieldCBA', 'targetCBA')
})

test('Check merge replacing deep nested values', () => {
  const source = {
    a: {
      aa: {
        aaa: undefined as any,
        aab: 'source aab'
      },
      ab: {
        aba: null as any,
        abb: {},
        abc: [ 'source 1', 'source 2' ]
      }
    }
  }

  const callResult = mergeLeft<Record<string, any>>(source, {
    a: {
      aa: { aaa: 'aaa target' },
      ab: { abb: undefined, abc: 'abc target' }
    }
  })

  expect(callResult).toHaveProperty('a.aa.aaa', 'aaa target')
  expect(callResult).toHaveProperty('a.ab.abb', {})
  expect(callResult).toHaveProperty('a.ab.abc', 'abc target')
})

test('Check nested contains only source keys', () => {
  const callResult = mergeLeft<Record<string, any>>(source, {
    fieldD: 'should not exist on callResult!',
    fieldA: {
      fieldAA:
        'Because fieldA is exists and not object - this fieldA should replace source, so field exists'
    },
    fieldC: {
      fieldCC: 'should not exist on callResult'
    }
  })
  expect(callResult).toHaveProperty('fieldA.fieldAA')

  expect(callResult).not.toHaveProperty('fieldD')
  expect(callResult).not.toHaveProperty('fieldC.fieldCC')
})
