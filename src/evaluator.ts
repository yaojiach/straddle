import { Lookup } from './lookup'
import { Card } from './card'
import { combinations } from './helpers'

const LOOKUP = new Lookup()

export class Evaluator {
  evaluate(cards: number[], board: number[]) {
    return combinations(cards.concat(board), 5)
      .map(c => this.five(c))
      .reduce((x, y) => x.score < y.score ? x : y)
  }

  private five(cards: number[]) {
    let score
    if (cards[0] & cards[1] & cards[2] & cards[3] & cards[4] & 0xf000) {
      const handOR = (cards[0] | cards[1] | cards[2] | cards[3] | cards[4]) >> 16
      score = LOOKUP.flushLookup[Card.primeProductFromRankBits(handOR)]
    } else {
      score = LOOKUP.unSuitedLookup[Card.primeProductFromHand(cards)]
    }
    return {
      hand: cards,
      score
    }
  }
}
