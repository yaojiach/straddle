import { Card } from './card'
import { getNextBitSequence } from './bits'
import { combinations } from './helpers'

const MAX_ROYAL_FLUSH = 1
const MAX_STRAIGHT_FLUSH = 10
const MAX_FOUR_OF_A_KIND = 166
const MAX_FULL_HOUSE = 322
const MAX_FLUSH = 1599
const MAX_STRAIGHT = 1609
const MAX_THREE_OF_A_KIND = 2467
const MAX_TWO_PAIR = 3325
const MAX_PAIR = 6185
const MAX_HIGH_CARD = 7462

const MAX_TO_RANK_CLASS: { [k: number]: string } = {
  [MAX_ROYAL_FLUSH]: 'Royal 👑 Flush',
  [MAX_STRAIGHT_FLUSH]: 'Straight Flush',
  [MAX_FOUR_OF_A_KIND]: 'Four of a Kind',
  [MAX_FULL_HOUSE]: 'Full House',
  [MAX_FLUSH]: 'Flush',
  [MAX_STRAIGHT]: 'Straight',
  [MAX_THREE_OF_A_KIND]: 'Three of a Kind',
  [MAX_TWO_PAIR]: 'Two Pair',
  [MAX_PAIR]: 'Pair',
  [MAX_HIGH_CARD]: 'High Card'
}

export function getHandFromScore(score: number) {
  const cutOffs = Object.keys(MAX_TO_RANK_CLASS).map((s) => parseInt(s))
  const diffs = cutOffs.map((c) => score - c)
  return MAX_TO_RANK_CLASS[cutOffs[diffs.indexOf(Math.max(...diffs.filter((d) => d <= 0)))]]
}

export class Lookup {
  flushLookup: { [k: string]: number } = {}
  unSuitedLookup: { [k: string]: number } = {}

  constructor() {
    this.populateFlushesStraightsHighs()
    this.populateMultiples()
  }

  private populateFlushesStraightsHighs() {
    const straight = [
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
    const nextBitGenerator = getNextBitSequence(Number('0b11111'))
    const other = [...Array(numFlushes - 1)]
      .map(() => nextBitGenerator.next().value)
      .filter((x) => !straight.some((s) => (x ^ s) === 0))
      .reverse()

    // flushes
    let rank = 1
    straight.forEach((x) => {
      this.flushLookup[Card.primeProductFromRankBits(x)] = rank
      rank += 1
    })
    rank = MAX_FULL_HOUSE + 1
    other.forEach((x) => {
      this.flushLookup[Card.primeProductFromRankBits(x)] = rank
      rank += 1
    })

    // unsuited, reuse same bit sequences for straight and high cards
    rank = MAX_FLUSH + 1
    straight.forEach((x) => {
      this.unSuitedLookup[Card.primeProductFromRankBits(x)] = rank
      rank += 1
    })
    rank = MAX_PAIR + 1
    other.forEach((x) => {
      this.unSuitedLookup[Card.primeProductFromRankBits(x)] = rank
      rank += 1
    })
  }

  private populateMultiples() {
    const reverseRank = Card.INT_RANKS.reverse()

    // Four of a kind
    let rank = MAX_STRAIGHT_FLUSH + 1
    reverseRank.forEach((r) => {
      reverseRank
        .filter((k) => k !== r)
        .forEach((k) => {
          this.unSuitedLookup[Card.PRIMES[r] ** 4 * Card.PRIMES[k]] = rank
          rank += 1
        })
    })

    // Full house
    rank = MAX_FOUR_OF_A_KIND + 1
    reverseRank.forEach((r) => {
      reverseRank
        .filter((k) => k !== r)
        .forEach((k) => {
          this.unSuitedLookup[Card.PRIMES[r] ** 3 * Card.PRIMES[k] ** 2] = rank
          rank += 1
        })
    })

    // Three of a kind
    rank = MAX_STRAIGHT + 1
    reverseRank.forEach((r) => {
      combinations(
        reverseRank.filter((k) => k !== r),
        2
      ).forEach(([x, y]) => {
        this.unSuitedLookup[Card.PRIMES[r] ** 3 * Card.PRIMES[x] * Card.PRIMES[y]] = rank
        rank += 1
      })
    })

    // Two pair
    rank = MAX_THREE_OF_A_KIND + 1
    combinations(reverseRank, 2).forEach(([x, y]) => {
      reverseRank
        .filter((k) => ![x, y].includes(k))
        .forEach((k) => {
          this.unSuitedLookup[Card.PRIMES[x] ** 2 * Card.PRIMES[y] ** 2 * Card.PRIMES[k]] = rank
          rank += 1
        })
    })

    // Pair
    rank = MAX_TWO_PAIR + 1
    reverseRank.forEach((r) => {
      combinations(
        reverseRank.filter((k) => k !== r),
        3
      ).forEach(([x, y, z]) => {
        this.unSuitedLookup[
          Card.PRIMES[r] ** 2 * Card.PRIMES[x] * Card.PRIMES[y] * Card.PRIMES[z]
        ] = rank
        rank += 1
      })
    })
  }
}
