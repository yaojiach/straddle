import { Lookup, getHandFromScore } from '../src/lookup'

describe('test lookup class', () => {
  const lookup = new Lookup()

  it('generates correct flushes straights and high cards', () => {
    expect(lookup.flushLookup[1966237]).toEqual(573)
    expect(Object.keys(lookup.flushLookup).length).toEqual(1287)
  })

  it('generates correct multiples', () => {
    expect(lookup.unSuitedLookup[48]).toEqual(166)
    expect(Object.keys(lookup.unSuitedLookup).length).toEqual(6175)
  })

  it('gets correct hand from score', () => {
    expect(getHandFromScore(1600)).toEqual('Straight')
  })
})
