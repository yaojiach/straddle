import { Card } from '../src/card'

describe('test card class', () => {
  it('creates right card', () => {
    expect(Card.new('Qh')).toEqual(67119647)
  })
})
