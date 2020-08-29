import { Lookup } from './lookup'
import { Card } from './card'

const LOOKUP = new Lookup()

export class Evaluator {
  handSizeMethod: { [k: number]: any } = {
    5: this.five
  }

  evaluate(cards: number[], board: number[]) {
    const allCards = cards.concat(board)
    return this.handSizeMethod[allCards.length](allCards)
  }

  private five(cards: number[]) {
    if (cards[0] & cards[1] & cards[2] & cards[3] & cards[4] & 0xf000) {
      const handOR = (cards[0] | cards[1] | cards[2] | cards[3] | cards[4]) >> 16
      return LOOKUP.flushLookup[Card.primeProductFromRankBits(handOR)]
    } else {
      return LOOKUP.unSuitedLookup[Card.primeProductFromHand(cards)]
    }
  }
}
