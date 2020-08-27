import { Deck } from '../src/deck'
import { Card } from '../src/card'

describe('test deck class', () => {
  it('creates right deck size', () => {
    const shuffledCards = new Deck().cards.map(c => Card.intToStr(c)).sort()
    expect(shuffledCards.length).toEqual(52)
  })

  it('creates right deck elements', () => {
    const shuffledCards = new Deck().cards.map(c => Card.intToStr(c)).sort()
    expect([shuffledCards[0], shuffledCards[51]]).toEqual(['2c', 'Ts'])
  })
})
