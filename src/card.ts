export class Card {
  static STR_RANKS = '23456789TJQKA'.split('')
  static INT_RANKS = [...Array(13).keys()]
  static PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]
  static STR_RANK_TO_INT_RANK = Object.fromEntries(
    Card.STR_RANKS.map((_, i) => [Card.STR_RANKS[i], Card.INT_RANKS[i]])
  )
  static STR_SUIT_TO_INT_SUIT: { [k: string]: number } = {
    s: 1, // spades
    h: 2, // hearts
    d: 4, // diamonds
    c: 8 // clubs
  }
  static INT_SUIT_TO_STR_SUIT = 'xshxdxxxc'.split('')
  static INT_SUIT_TO_PRETTY_SUIT: { [k: string]: string } = {
    1: '♠️',
    2: '♥️',
    4: '♦️',
    8: '♣️'
  }

  static new(id: string): number {
    const rankInt = Card.STR_RANK_TO_INT_RANK[id[0]]
    const suitInt = Card.STR_SUIT_TO_INT_SUIT[id[1]]
    const rankPrime = Card.PRIMES[rankInt]

    const bitRank = (1 << rankInt) << 16
    const suit = suitInt << 12
    const rank = rankInt << 8

    return bitRank | suit | rank | rankPrime
  }
}
