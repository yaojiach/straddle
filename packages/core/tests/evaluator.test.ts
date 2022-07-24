import { Evaluator, Card } from '../src/index'

const evaluator = new Evaluator()

describe('test evaluator class', () => {
  it('evaluates correctly for unsuited 5 cards', () => {
    const res = evaluator.evaluate(
      [Card.new('Qs'), Card.new('Th')],
      [Card.new('Ah'), Card.new('Kd'), Card.new('Jc')]
    )
    expect(res.score).toEqual(1600)
  })

  it('evaluates correctly for flush 5 cards', () => {
    const res = evaluator.evaluate(
      [Card.new('Qh'), Card.new('Th')],
      [Card.new('Ah'), Card.new('Kh'), Card.new('Jh')]
    )
    expect(res.score).toEqual(1)
  })

  it('evaluates correctly for 7 cards', () => {
    const res = evaluator.evaluate(
      [Card.new('Qs'), Card.new('Jc')],
      [Card.new('Ah'), Card.new('Th'), Card.new('5c'), Card.new('Kd'), Card.new('6d')]
    )
    expect(res.hand.map((c) => Card.intToStr(c))).toEqual(['Qs', 'Jc', 'Ah', 'Th', 'Kd'])
    expect(res.score).toEqual(1600)
  })
})
