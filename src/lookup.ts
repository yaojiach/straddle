import { Card } from '.'

export class Lookup {
  static MAX_STRAIGHT_FLUSH = 10
  static MAX_FOUR_OF_A_KIND = 166
  static MAX_FULL_HOUSE = 322
  static MAX_FLUSH = 1599
  static MAX_STRAIGHT = 1609
  static MAX_THREE_OF_A_KIND = 2467
  static MAX_TWO_PAIR = 3325
  static MAX_PAIR = 6185
  static MAX_HIGH_CARD = 7462

  static MAX_TO_RANK_CLASS = {
    MAX_STRAIGHT_FLUSH: 1,
    MAX_FOUR_OF_A_KIND: 2,
    MAX_FULL_HOUSE: 3,
    MAX_FLUSH: 4,
    MAX_STRAIGHT: 5,
    MAX_THREE_OF_A_KIND: 6,
    MAX_TWO_PAIR: 7,
    MAX_PAIR: 8,
    MAX_HIGH_CARD: 9
  }

  static RANK_CLASS_TO_STRING = {
    1: 'Straight Flush',
    2: 'Four of a Kind',
    3: 'Full House',
    4: 'Flush',
    5: 'Straight',
    6: 'Three of a Kind',
    7: 'Two Pair',
    8: 'Pair',
    9: 'High Card'
  }

  flushLookup: { [k: string]: number } = {}
  unSuitedLookup: { [k: string]: number } = {}

  constructor() {
    this.populateFlushesStraightsHighs()
  }

  populateFlushesStraightsHighs() {
    const straightFlushes = [
      7936, // 0b1111100000000, royal flush
      3968, // 0b111110000000
      1984, // 0b11111000000
      992, // 0b1111100000
      496, // 0b111110000
      248, // 0b11111000
      124, // 0b1111100
      62, // 0b111110
      31, // 0b11111
      4111 // 0b1000000001111, 5 high
    ]

    const numFlushes = 1287 // 13 choose 5
    const nextBitGenerator = this.getNextBitSequence(Number('0b11111'))
    const otherFlushes = [...Array(numFlushes - 1)]
      .map(() => nextBitGenerator.next().value)
      .filter(x => !straightFlushes.some(s => (x ^ s) === 0))
      .reverse()

    // flushes
    let rank = 1
    straightFlushes.forEach(x => {
      this.flushLookup[Card.primeProductFromRankBits(x)] = rank
      rank += 1
    })
    rank = Lookup.MAX_FULL_HOUSE + 1
    otherFlushes.forEach(x => {
      this.flushLookup[Card.primeProductFromRankBits(x)] = rank
      rank += 1
    })

    // unsuited, reuse same bit sequences for straight and high cards
    rank = Lookup.MAX_FLUSH + 1
    straightFlushes.forEach(x => {
      this.unSuitedLookup[Card.primeProductFromRankBits(x)] = rank
      rank += 1
    })
    rank = Lookup.MAX_PAIR + 1
    otherFlushes.forEach(x => {
      this.unSuitedLookup[Card.primeProductFromRankBits(x)] = rank
      rank += 1
    })
  }

  *getNextBitSequence(bits: number): Generator<number, any, number> {
    let t = (bits | (bits - 1)) + 1
    let next = t | ((((t & -t) / (bits & -bits)) >> 1) - 1)
    yield next
    while (true) {
      t = (next | (next - 1)) + 1
      next = t | ((((t & -t) / (next & -next)) >> 1) - 1)
      yield next
    }
  }
}
