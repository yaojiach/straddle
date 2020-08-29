import { Evaluator } from '../src/evaluator'
import { Card } from '../src/card'

const evaluator = new Evaluator()

describe('test evaluator class', () => {
  it('evaluates correctly for 5 cards', () => {
    const res = evaluator.evaluate(
      [Card.new('Qs'), Card.new('Th')],
      [Card.new('Ah'), Card.new('Kd'), Card.new('Jc')]
    )
    expect(res).toEqual(1600)
  })
})
