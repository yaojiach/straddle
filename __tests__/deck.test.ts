import { Deck } from '../src/deck'
import { Card } from '../src/card'

describe('test deck class', () => {
  it('creates right deck size', () => {
    expect(new Deck().cards.length).toEqual(52)
  })

  it('creates right deck elements', () => {
    const shuffledCards = new Deck().cards.map(c => Card.intToStr(c)).sort()
    expect([shuffledCards[0], shuffledCards[51]]).toEqual(['2c', 'Ts'])
  })
})

describe('test deck draw', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0)
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('draws the right deck', () => {
    expect(new Deck().draw(2).map(c => Card.intToStr(c))).toEqual(['Ac', 'Ad'])
  })
})
