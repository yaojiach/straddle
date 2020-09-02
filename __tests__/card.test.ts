import { Card } from '../src/index'

describe('test card class', () => {
  it('creates right card', () => {
    expect(Card.new('Qh')).toEqual(67119647)
  })

  it('returns the right string from int', () => {
    expect(Card.intToStr(67119647)).toEqual('Qh')
  })

  it('returns the right prime product from a hand', () => {
    expect(Card.primeProductFromHand([Card.new('As'), Card.new('Qh')])).toEqual(1271)
  })

  it('returns the right prime product from a rank bits', () => {
    expect(Card.primeProductFromRankBits(7936)).toEqual(31367009)
  })

  it('returns the right pretty print from int', () => {
    expect(Card.intToPrettyStr(67119647)).toEqual('[Q♥️]')
  })
})
