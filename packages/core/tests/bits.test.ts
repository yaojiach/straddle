import { getNextBitSequence } from '../src/bits'

describe('test bits module', () => {
  it('generates correct next bit sequence', () => {
    const gen = getNextBitSequence(Number('0b11111'))
    const firstTwo = [gen.next().value, gen.next().value]
    expect(firstTwo).toEqual([47, 55])
  })
})
