import { Lookup } from '../src/lookup'

describe('test lookup class', () => {
  it('generates correct next bit sequence', () => {
    const gen = new Lookup().getNextBitSequence(Number('0b11111'))
    const firstTwo = [gen.next().value, gen.next().value]
    expect(firstTwo).toEqual([47, 55])
  })

  it('generates correct flushes straights and high cards', () => {
    const lookup = new Lookup()
    expect(Object.keys(lookup.flushLookup).length).toEqual(1287)
  })
})
